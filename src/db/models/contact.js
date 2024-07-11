import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false },
    isFavorite: { type: Boolean, required: true, default: false },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
    // createdAt: { type: String, required: true },
    // updatedAt: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const ContactsCollection = model('contacts', contactSchema);
