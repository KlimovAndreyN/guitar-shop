import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ApiPropertyOption } from '../constants/api-property-option';

export class UserRdo {
  @ApiProperty(ApiPropertyOption.User.Id)
  @Expose()
  public id: string;

  @ApiProperty(ApiPropertyOption.User.Email)
  @Expose()
  public email: string;

  @ApiProperty(ApiPropertyOption.User.Name)
  @Expose()
  public name: string;
}
