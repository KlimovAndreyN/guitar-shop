import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

import { ApiPropertyOption, transformDate } from '@backend/shared/core';

import { BaseProductDto } from './base-product.dto';
import { Transform } from 'class-transformer';

export class CreatePostDto extends BaseProductDto {
  @ApiProperty({
    ...ApiPropertyOption.Product.AddedDate,
    required: false
  })
  @IsOptional()
  @IsDateString({ strict: true })
  @Transform(transformDate)
  public publishDate?: string;
}
