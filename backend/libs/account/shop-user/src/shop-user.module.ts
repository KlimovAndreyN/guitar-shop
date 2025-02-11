import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShopUserRepository } from './shop-user.repository';
import { ShopUserFactory } from './shop-user.factory';
import { ShopUserModel, ShopUserSchema } from './shop-user.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: ShopUserModel.name,
          schema: ShopUserSchema
        }
      ]
    )
  ],
  providers: [
    ShopUserRepository,
    ShopUserFactory
  ],
  exports: [ShopUserRepository]
})
export class ShopUserModule { }
