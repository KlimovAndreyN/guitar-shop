import { Body, Controller, HttpCode, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BearerAuth, RequestWithBearerAuth, RequestWithTokenPayload, RouteAlias, UserRdo, ApiOperationOption } from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';
import { InjectBearerAuthInterceptor } from '@backend/shared/interceptors';
import { RequestWithShopUserEntity } from '@backend/account/shop-user';

import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { TokenPayloadRdo } from './rdo/token-payload.rdo';
import { AuthenticationApiResponse } from './authentication.constant';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) { }

  @ApiOperation(ApiOperationOption.User.Register)
  @ApiResponse(AuthenticationApiResponse.UserCreated)
  @ApiResponse(AuthenticationApiResponse.UserExist)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.NotAllow)
  @ApiBearerAuth(BearerAuth.AccessToken) // для тестирования - анонимный пользователь может регистрироваться
  @UseInterceptors(InjectBearerAuthInterceptor)
  @Post(RouteAlias.Register)
  public async register(
    @Body() dto: CreateUserDto,
    @Req() { bearerAuth }: RequestWithBearerAuth
  ): Promise<UserRdo> {
    // headers: Authorization - т.к. только анонимный пользователь может регистрироваться
    const newUser = await this.authService.registerUser(bearerAuth, dto);

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiOperation(ApiOperationOption.User.Login)
  @ApiResponse(AuthenticationApiResponse.LoggedSuccess)
  @ApiResponse(AuthenticationApiResponse.LoggedError)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  @Post(RouteAlias.Login)
  public async login(@Req() { user }: RequestWithShopUserEntity): Promise<LoggedUserRdo> {
    const userToken = await this.authService.createUserToken(user);

    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiOperation(ApiOperationOption.User.Check)
  @ApiResponse(AuthenticationApiResponse.CheckSuccess)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.AccessToken)
  @HttpCode(AuthenticationApiResponse.CheckSuccess.status)
  @UseGuards(JwtAuthGuard)
  @Post(RouteAlias.Check)
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload): Promise<TokenPayloadRdo> {
    return fillDto(TokenPayloadRdo, payload);
  }
}
