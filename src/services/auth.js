import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return await User.create(payload);
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(401, 'Email or password is incorrect');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Email or password is incorrect');
  }
};
