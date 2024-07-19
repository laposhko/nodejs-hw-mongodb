import { model, Schema } from 'mongoose';
import { mongooseSaveError } from '../hooks.js';
import {
  contactTypes,
  emailRegexp,
  numberRegexp,
} from '../../constants/contacts-constants.js';
import { setUpdateSettings } from '../hooks.js';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, match: numberRegexp },
    email: {
      type: String,
      required: false,
      match: emailRegexp,
    },
    isFavorite: { type: Boolean, default: false },
    contactType: {
      type: String,
      required: true,
      enum: contactTypes,
      default: 'personal',
    },
  },
  { timestamps: true, versionKey: false },
);

contactSchema.post('save', mongooseSaveError);

contactSchema.pre('findOneAndUpdate', setUpdateSettings);
contactSchema.post('findOneAndUpdate', mongooseSaveError);

export const ContactsCollection = model('contacts', contactSchema);
