import Joi from 'joi';
import { emailRegexp } from '../constants/contacts-constants.js';
export const userSignupSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(5).max(20).pattern(emailRegexp).required(),
  password: Joi.string().min(5).max(20).required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().min(5).max(20).pattern(emailRegexp).required(),
  password: Joi.string().min(5).max(20).required(),
});

// export const userSigninSchema = Joi.object({
//   name: Joi.string().min(3).max(20),
//   email: Joi.string()
//     .min(5)
//     .max(20)
//     .pattern(emailRegexp)
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ['com', 'net', 'ua'] },
//     }),
//   password: Joi.string().min(5).max(20),
// });
