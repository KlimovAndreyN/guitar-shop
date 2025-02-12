import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { ApiPropertyOption } from '@backend/shared/core';

export class LoginUserDto {
  @ApiProperty(ApiPropertyOption.User.Login)
  @IsString()
  public login: string;

  @ApiProperty(ApiPropertyOption.User.Password)
  @IsString()
  public password: string;
}
