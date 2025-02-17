import mongoose from 'mongoose';

import { AuthUser, User } from '@backend/shared/core';
import { ACCOUNTS_COLLECTION, ShopUserSchema } from '@backend/account/shop-user';

export type MockUser = User & { password: string };

export const MockUserEntity = mongoose.model<AuthUser>(ACCOUNTS_COLLECTION, ShopUserSchema);
