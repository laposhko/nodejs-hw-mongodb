import cloudinary from 'cloudinary';
import env from './env.js';
import fs from 'node:fs/promises';

cloudinary.v2.config({
  secure: true,
  cloud_name: env('CLOUD_NAME'),
  api_key: env('CLOUD_API_KEY'),
  api_secret: env('CLOUD_API_SECRET'),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
