import * as Mongoose from 'mongoose';
import { genSalt, hash } from 'bcrypt';

import { SALT_ROUNDS } from '@backend/account/shop-user';

import { MOCK_USER_ADMIN } from './mocks';
import { MockUserEntity } from './type';

export async function generateAccount(mongoDbUrl: string) {
  const mongoose = await Mongoose.connect(mongoDbUrl);
  const salt = await genSalt(SALT_ROUNDS);
  const { id, email, name, password } = MOCK_USER_ADMIN;
  const passwordHash = await hash(password, salt);

  await new MockUserEntity({ id, email, name, passwordHash }).save();

  await mongoose.disconnect?.();
  console.info('🤘️ Database mongoDb was filled!');
}
