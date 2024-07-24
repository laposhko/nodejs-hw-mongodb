import path from 'node:path';

export const contactTypes = ['work', 'home', 'personal'];
export const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const numberRegexp =
  /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
export const sortOrderList = ['asc', 'desc'];
export const fieldList = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavorite',
  'contactType',
  'createdAt',
  'updatedAt',
];
export const ACCESS_TOKEN_LIFETIME = 15 * 60 * 1000;

export const REFRESH_TOKEN_LIFETIME = 7 * 24 * 3600 * 1000;

// export const SMTP = {
//   SMTP_HOST: 'SMTP_HOST',
//   SMTP_PORT: 'SMTP_PORT',
//   SMTP_USER: 'SMTP_USER',
//   SMTP_PASSWORD: 'SMTP_PASSWORD',
//   SMTP_FROM: 'SMTP_FROM',
// };

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
