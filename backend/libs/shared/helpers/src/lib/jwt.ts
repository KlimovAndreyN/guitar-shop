import { User, TokenPayload } from '@backend/shared/core';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    name: user.name
  };
}
