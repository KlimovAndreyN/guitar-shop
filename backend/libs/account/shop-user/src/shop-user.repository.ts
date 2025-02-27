import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@backend/shared/data-access';

import { ShopUserEntity } from './shop-user.entity';
import { ShopUserFactory } from './shop-user.factory';
import { ShopUserModel } from './shop-user.model';

@Injectable()
export class ShopUserRepository extends BaseMongoRepository<ShopUserEntity, ShopUserModel> {
  constructor(
    entityFactory: ShopUserFactory,
    @InjectModel(ShopUserModel.name)
    shopUserModel: Model<ShopUserModel>
  ) {
    super(entityFactory, shopUserModel);
  }

  public async findByEmail(email: string): Promise<ShopUserEntity | null> {
    const document = await this.model.findOne({ email }).exec();

    return this.createEntityFromDocument(document);
  }
}
