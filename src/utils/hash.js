import bcrypt from 'bcryptjs';

export const hashValue = (value) => bcrypt.hash(value, 10);

export const compareHash = (value, hashedValue) =>
  bcrypt.compare(value, hashedValue);
