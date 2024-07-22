import { UsersCollection } from '../db/models/user.js';
import { hashValue } from '../utils/hash.js';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendMail.js';
import env from '../utils/env.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMPLATES_DIR } from '../constants/contacts-constants.js';
import bcrypt from 'bcryptjs';
export const findUser = (filter) => UsersCollection.findOne(filter);
export const registerUser = async (payload) => {
  const user = await UsersCollection.create({
    ...payload,
    password: await hashValue(payload.password),
  });
  return user;
};

export const requestResetToken = async (email) => {
  console.log('service work');
  const user = await UsersCollection.findOne({ email });
  console.log(user);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '15m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );
  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();
  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/reset-pwd?token=${resetToken}`,
  });

  await sendEmail({
    from: env('SMTP_FROM'),
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const user = await UsersCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  console.log(payload.password);
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UsersCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};
