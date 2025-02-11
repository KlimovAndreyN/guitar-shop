import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { getJwtOptions } from '@backend/account/config';
import { ShopUserModule } from '@backend/account/shop-user';
import { NotifyModule } from '@backend/account/notify';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { LocalStrategy } from './strategies/local.strategy';

const JwtModuleOption = {
  inject: [ConfigService],
  useFactory: getJwtOptions
}

@Module({
  imports: [
    ShopUserModule,
    JwtModule.registerAsync(JwtModuleOption),
    NotifyModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy
  ]
})
export class AuthenticationModule { }
