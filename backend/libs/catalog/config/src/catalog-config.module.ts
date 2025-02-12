import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { catalogConfig } from './catalog.config';

const ENV_FILE_PATH = 'apps/catalog/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [catalogConfig],
      envFilePath: ENV_FILE_PATH
    })
  ]
})
export class CatalogConfigModule { }
