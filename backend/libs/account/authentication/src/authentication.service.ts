import {
  ConflictException, ForbiddenException, HttpException, HttpStatus, Inject,
  Injectable, Logger, NotFoundException, UnauthorizedException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Token, User } from '@backend/shared/core';
import { createJWTPayload } from '@backend/shared/helpers';
import { ShopUserRepository, ShopUserEntity } from '@backend/account/shop-user';
import { applicationConfig } from '@backend/account/config';
import { MailService } from '@backend/account/mail';

import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationUserMessage } from './authentication.constant';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly shopUserRepository: ShopUserRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    @Inject(applicationConfig.KEY)
    private readonly applicationOptions: ConfigType<typeof applicationConfig>
  ) { }

  public async registerUser(
    authorizationHeader: string,
    dto: CreateUserDto
  ): Promise<ShopUserEntity> {
    if (authorizationHeader) {
      throw new ForbiddenException(AuthenticationUserMessage.RequireLogout);
    }

    const { email, name, password } = dto;
    const existUser = await this.shopUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthenticationUserMessage.Exists);
    }

    const shopUser = {
      email,
      name,
      passwordHash: ''
    };

    const userEntity = new ShopUserEntity(shopUser);

    await userEntity.setPassword(password);
    await this.shopUserRepository.save(userEntity);
    await this.mailService.sendNotifyRegiteredUser(this.applicationOptions.frontendLoginUrl, name, email, password);

    return userEntity;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      return { accessToken };
    } catch (error) {
      this.logger.error(`Token generation error: ${error.message}`);

      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async logout(authorizationHeader: string): Promise<void> {
    if (!authorizationHeader) {
      return;
    }

    this.logger.log('AuthenticationService.logout');
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.shopUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async verifyUser(dto: LoginUserDto): Promise<ShopUserEntity> {
    const { login, password } = dto;
    const existUser = await this.getUserByEmail(login);

    const isCorrectPassword = await existUser.comparePassword(password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(AuthenticationUserMessage.WrongPassword);
    }

    return existUser;
  }
}
