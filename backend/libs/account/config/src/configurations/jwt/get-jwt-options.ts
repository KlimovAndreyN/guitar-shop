import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

import { ConfigAlias } from '@backend/shared/core';

export async function getJwtOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>(ConfigAlias.AppJwtAccessTokenSecret),
    signOptions: {
      expiresIn: configService.get<string>(ConfigAlias.AppJwtAccessTokenExpiresIn),
      algorithm: 'HS256'
    }
  }
}
