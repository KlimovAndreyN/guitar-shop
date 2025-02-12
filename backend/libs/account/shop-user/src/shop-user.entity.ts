import { compare, genSalt, hash } from 'bcrypt';

import { Entity, StorableEntity, AuthUser } from '@backend/shared/core';

import { SALT_ROUNDS } from './shop-user.constant';

export class ShopUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public name: string;
  public passwordHash: string;
  public createdAt: Date;

  constructor(user?: AuthUser) {
    super();

    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? undefined;
    this.email = user.email;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt
    }
  }

  public async setPassword(password: string): Promise<ShopUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);

    this.passwordHash = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
