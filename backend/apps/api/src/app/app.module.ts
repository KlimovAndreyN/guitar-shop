import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiConfigModule } from '@backend/api/config';

import { UserService } from './user.service';
import { CatalogService } from './catalog.service';
import { UsersController } from './users.controller';
import { CatalogController } from './catalog.controller';

const HTTP_CLIENT_MAX_REDIRECTS = 5;
const HTTP_CLIENT_TIMEOUT = 3000;

@Module({
  imports: [
    ApiConfigModule,
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS
    })
  ],
  controllers: [
    UsersController,
    CatalogController
  ],
  providers: [
    UserService,
    CatalogService
  ]
})
export class AppModule { }
