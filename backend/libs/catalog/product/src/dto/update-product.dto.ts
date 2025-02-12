import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

import { ApiPropertyOption, transformDate } from '@backend/shared/core';

import { BaseProductDto } from './base-product.dto';

export class UpdatePostDto extends BaseProductDto {
  @ApiProperty(ApiPropertyOption.Product.AddedDate)
  @IsDateString({ strict: true })
  @Transform(transformDate)
  public publishDate: string;
}
