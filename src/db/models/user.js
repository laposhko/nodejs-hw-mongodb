import { model, Schema } from 'mongoose';
import { emailRegexp } from '../../constants/contacts-constants.js';
import { setUpdateSettings } from '../hooks.js';
import { mongooseSaveError } from '../hooks.js';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, match: emailRegexp, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

userSchema.post('save', mongooseSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSettings);
userSchema.post('findOneAndUpdate', mongooseSaveError);

export const UsersCollection = model('users', userSchema);
