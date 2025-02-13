import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { join } from 'path/posix';

import { apiConfig } from '@backend/api/config';

@Injectable()
export class UserService {
  constructor(
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  public getUrl(route = ''): string {
    return join(this.apiOptions.accountServiceUrl, route);
  }
}
