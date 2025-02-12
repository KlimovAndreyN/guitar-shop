import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { applicationConfig } from './configurations/app.config';
import { jwtConfig } from './configurations/jwt.config';
import { mongoDbConfig } from './configurations/mongo-db.config';

const ENV_FILE_PATH = 'apps/account/.env';

const configModuleOptions = {
  isGlobal: true,
  cache: true,
  load: [
    applicationConfig,
    jwtConfig,
    mongoDbConfig
  ],
  envFilePath: ENV_FILE_PATH
}

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)]
})
export class AccountConfigModule { }
