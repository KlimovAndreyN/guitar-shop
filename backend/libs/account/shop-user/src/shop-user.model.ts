import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { AuthUser } from '@backend/shared/core';

import { ACCOUNTS_COLLECTION } from './shop-user.constant';

@Schema({
  collection: ACCOUNTS_COLLECTION,
  timestamps: true
})
export class ShopUserModel extends Document implements AuthUser {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public passwordHash: string;

  public createdAt: Date;
}

export const ShopUserSchema = SchemaFactory.createForClass(ShopUserModel);
