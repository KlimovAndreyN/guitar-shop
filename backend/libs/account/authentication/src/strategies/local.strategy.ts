import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { getValidationErrorString } from '@backend/shared/helpers';
import { ShopUserEntity } from '@backend/account/shop-user';

import { AuthenticationService } from '../authentication.service';
import { LoginUserDto } from '../dto/login-user.dto';

const USERNAME_FIELD_NAME = 'login';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({ usernameField: USERNAME_FIELD_NAME });
  }

  public async validate(login: string, password: string): Promise<ShopUserEntity> {
    const dto = { login, password };
    const error = validateSync(plainToClass(LoginUserDto, dto));

    if (error.length) {
      throw new BadRequestException(getValidationErrorString(error));
    }

    const userEntity = await this.authService.verifyUser({ login, password });

    return userEntity;
  }
}
