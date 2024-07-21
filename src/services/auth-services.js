import { UsersCollection } from '../db/models/user.js';
import { hashValue } from '../utils/hash.js';

export const findUser = (filter) => UsersCollection.findOne(filter);
export const registerUser = async (payload) => {
  const user = await UsersCollection.create({
    ...payload,
    password: await hashValue(payload.password),
  });
  return user;
};

export const loginUser = async (payload) => {};
