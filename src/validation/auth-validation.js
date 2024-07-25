import Joi from 'joi';
import { emailRegexp } from '../constants/contacts-constants.js';
export const userSignupSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(5).pattern(emailRegexp).required(),
  password: Joi.string().min(5).max(20).required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().min(5).pattern(emailRegexp).required(),
  password: Joi.string().min(5).max(20).required(),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
