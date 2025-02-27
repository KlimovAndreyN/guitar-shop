import { HttpStatus } from '@nestjs/common';

import { UserRdo } from '@backend/shared/core';

import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { TokenPayloadRdo } from './rdo/token-payload.rdo';

export const AuthenticationUserMessage = {
  Exists: 'User with this email already exists.',
  WrongLoginOrPassword: 'Login or password is wrong.',
  RequireLogout: 'Require logout.'
} as const;

export const UserValidation = {
  Name: {
    MinLength: 1,
    MaxLength: 15
  },
  Password: {
    MinLength: 6,
    MaxLength: 12,
  },
  LogonPassword: {
    LogonMinLength: 1
  },
  LogonLogin: {
    Regexp: /[a-zA-Zа-яА-Я]/,
    Message: 'login macth least one letter'
  },
} as const;

export const AuthenticationApiResponse = {
  UserCreated: {
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  },
  UserExist: {
    status: HttpStatus.CONFLICT,
    description: AuthenticationUserMessage.Exists
  },
  Unauthorized: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.'
  },
  NotAllow: {
    status: HttpStatus.FORBIDDEN,
    description: AuthenticationUserMessage.RequireLogout
  },
  BadRequest: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.'
  },
  UserNotFound: {
    status: HttpStatus.BAD_REQUEST,
    description: 'User not found.'
  },
  LoggedSuccess: {
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  },
  CheckSuccess: {
    type: TokenPayloadRdo,
    status: HttpStatus.OK,
    description: 'Check access token success.'
  },
  LoggedError: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.'
  }
} as const;

