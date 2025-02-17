import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

import { ApiPropertyOption } from '@backend/shared/core';

import { UserValidation } from '../authentication.constant';

export class LoginUserDto {
  @ApiProperty(ApiPropertyOption.User.Login)
  @IsString()
  @Matches(UserValidation.LogonLogin.Regexp, { message: UserValidation.LogonLogin.Message })
  public login: string;

  @ApiProperty(ApiPropertyOption.User.Password)
  @IsString()
  @MinLength(UserValidation.LogonPassword.LogonMinLength)
  public password: string;
}
