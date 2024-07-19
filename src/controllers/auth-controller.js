import createHttpError from 'http-errors';
import { registerUser, findUser } from '../services/auth-services.js';
export const userSignupController = async (req, res, next) => {
  const { email } = req.body;
  const existingUser = await findUser({ email });
  if (existingUser) {
    throw createHttpError(409, 'email exist');
  }
  const user = await registerUser(req.body);
  const data = {
    name: user.name,
    email: user.email,
  };
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user',
    data,
  });
};
