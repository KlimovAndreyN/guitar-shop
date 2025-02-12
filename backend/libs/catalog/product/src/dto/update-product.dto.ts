import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

import { ApiPropertyOption, transformDate } from '@backend/shared/core';

import { BaseProductDto } from './base-product.dto';

export class UpdateProductDto extends BaseProductDto {
  @ApiProperty(ApiPropertyOption.Product.AddedDate)
  @IsDateString({ strict: true }) //! валидация пройдет? dd.mm.yyyyy
  @Transform(transformDate)
  public addedDate: string;
}
