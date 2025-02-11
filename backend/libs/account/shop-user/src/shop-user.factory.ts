import { Injectable } from '@nestjs/common';

import { AuthUser, EntityFactory } from '@backend/shared/core';

import { ShopUserEntity } from './shop-user.entity';

@Injectable()
export class ShopUserFactory implements EntityFactory<ShopUserEntity> {
  public create(entityPlainData: AuthUser): ShopUserEntity {
    return new ShopUserEntity(entityPlainData);
  }
}
