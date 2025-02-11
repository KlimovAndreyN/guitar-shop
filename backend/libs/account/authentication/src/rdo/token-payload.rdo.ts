import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ApiPropertyOption } from '@backend/shared/core';

export class TokenPayloadRdo {
  @ApiProperty(ApiPropertyOption.User.Id)
  @Expose()
  public sub: string;

  @ApiProperty(ApiPropertyOption.User.Email)
  @Expose()
  public email: string;

  @ApiProperty(ApiPropertyOption.User.Name)
  @Expose()
  public name: string;
}
