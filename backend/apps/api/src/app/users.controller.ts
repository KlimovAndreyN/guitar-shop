import { Body, Controller, Get, HttpCode, Inject, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigType } from '@nestjs/config';

import {
  BearerAuth, RequestWithRequestId, RequestWithTokenPayload, UserRdo,
  RouteAlias, RequestWithRequestIdAndBearerAuth, ApiOperationOption
} from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';
import { AuthenticationApiResponse, CreateUserDto, LoggedUserRdo, LoginUserDto, TokenPayloadRdo } from '@backend/account/authentication';
import { apiConfig } from '@backend/api/config';

import { CheckAuthGuard } from './guards/check-auth.guard';

@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>,
    private readonly httpService: HttpService
  ) { }

  private getUrl(route: string): string {
    return [this.apiOptions.accountServiceUrl, route].join('/');
  }

  @ApiOperation(ApiOperationOption.User.Register)
  @ApiResponse(AuthenticationApiResponse.UserCreated)
  @ApiResponse(AuthenticationApiResponse.UserExist)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.NotAllow)
  @ApiBearerAuth(BearerAuth.AccessToken)
  @Post(RouteAlias.Register)
  public async register(
    @Body() dto: CreateUserDto,
    @Req() { requestId, bearerAuth }: RequestWithRequestIdAndBearerAuth
  ): Promise<UserRdo> {
    // можно сразу проверить есть ли bearerAuth, и выкинуть ошибку, что требуется logout, пока передаю в account, там есть проверка
    const url = this.getUrl(RouteAlias.Register);
    // headers: Authorization - т.к. только анонимный пользователь может регистрироваться
    const headers = makeHeaders(requestId, bearerAuth);
    const { data: registerData } = await this.httpService.axiosRef.post<UserRdo>(
      url,
      dto,
      headers
    );

    return registerData;
  }

  @ApiOperation(ApiOperationOption.User.Login)
  @ApiResponse(AuthenticationApiResponse.LoggedSuccess)
  @ApiResponse(AuthenticationApiResponse.LoggedError)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.UserNotFound)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @Post(RouteAlias.Login)
  public async login(@Body() dto: LoginUserDto, @Req() { requestId }: RequestWithRequestId): Promise<LoggedUserRdo> {
    const url = this.getUrl(RouteAlias.Login);
    const headers = makeHeaders(requestId);
    const { data } = await this.httpService.axiosRef.post<LoggedUserRdo>(url, dto, headers);

    return data;
  }

  @ApiOperation(ApiOperationOption.User.Check)
  @ApiResponse(AuthenticationApiResponse.CheckSuccess)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.AccessToken)
  @HttpCode(AuthenticationApiResponse.CheckSuccess.status)
  @UseGuards(CheckAuthGuard)
  @Get(RouteAlias.Check)
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload): Promise<TokenPayloadRdo> {
    return payload;
  }
}
