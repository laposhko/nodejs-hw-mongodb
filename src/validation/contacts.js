import Joi from 'joi';
import {
  contactTypes,
  emailRegexp,
  numberRegexp,
} from '../constants/contacts-constants.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  // .messages({
  //   'string.base': 'Name should be a string',
  //   'string.min': 'Name should have at least 3 characters',
  //   'string.max': 'Name cannot be longer than 20 characters',
  //   'any.required': 'Name is required',
  // }),
  phoneNumber: Joi.string().min(8).max(20).pattern(numberRegexp).required(),
  // .messages({
  //   'string.base': 'Phone number should be a string',
  //   'string.min': 'Phone number should have at least 8 characters',
  //   'string.max': 'Phone number cannot be longer than 10 characters',
  //'string.pattern.base'
  //   'any.required': 'Phone number is required',
  // }),
  email: Joi.string()
    .min(5)
    .max(20)
    .pattern(emailRegexp)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua'] },
    }),
  // .messages({
  //   'string.base': 'Email address number should be a string',
  //   'string.min': 'Email address should have at least 5 characters',
  //   'string.max': 'Email address cannot be longer than 20 characters',
  //   'string.email': 'Email address is incorrect format',
  // }),
  isFavorite: Joi.boolean().required(),
  // .messages({
  //   'any.required': 'This field is required',
  // }),
  contactType: Joi.string()
    .valid(...contactTypes)
    .required(),
  // .messages({
  //   'string.base': 'Contact type should be a string',
  //   'string.valid': "Contact type can be only 'work', 'home', 'personal'",
  //   'any.required': 'Contact type is required',
  // }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  // .messages({
  //   'string.base': 'Name should be a string',
  //   'string.min': 'Name should have at least 3 characters',
  //   'string.max': 'Name cannot be longer than 20 characters',
  //   'any.required': 'Name is required',
  // }),
  phoneNumber: Joi.string().min(8).max(20).pattern(numberRegexp),
  // .messages({
  //   'string.base': 'Phone number should be a string',
  //   'string.min': 'Phone number should have at least 8 characters',
  //   'string.max': 'Phone number cannot be longer than 10 characters',
  //'string.pattern.base'
  //   'any.required': 'Phone number is required',
  // }),
  email: Joi.string()
    .min(5)
    .max(20)
    .pattern(emailRegexp)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua'] },
    }),
  // .messages({
  //   'string.base': 'Email address number should be a string',
  //   'string.min': 'Email address should have at least 5 characters',
  //   'string.max': 'Email address cannot be longer than 20 characters',
  //   'string.email': 'Email address is incorrect format',
  // }),
  isFavorite: Joi.boolean(),
  // .messages({
  //   'any.required': 'This field is required',
  // }),
  contactType: Joi.string().valid(...contactTypes),
  // .messages({
  //   'string.base': 'Contact type should be a string',
  //   'string.valid': "Contact type can be only 'work', 'home', 'personal'",
  //   'any.required': 'Contact type is required',
  // }),
});
