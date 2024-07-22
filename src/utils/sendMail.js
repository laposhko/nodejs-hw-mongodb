import nodemailer from 'nodemailer';
// import { SMTP } from '../constants/contacts-constants.js';
import env from '../utils/env.js';
// import { compareSync } from 'bcryptjs';
// const details = {
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: laposhko0@gmail,
//     pass: env('SMTP_PASSWORD'),
//   },
// };
const transporter = nodemailer.createTransport({
  host: env('SMTP_HOST'),
  port: Number(env('SMTP_PORT')),
  auth: {
    user: env('SMTP_USER'),
    pass: env('SMTP_PASSWORD'),
  },
});

export const sendEmail = async (options) => {
  console.log('send email util');
  console.log(options);
  const info = await transporter.sendMail(options);
  console.log(info);
  return info;
};
