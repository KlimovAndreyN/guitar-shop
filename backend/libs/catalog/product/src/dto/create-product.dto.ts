import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

import { ApiPropertyOption } from '@backend/shared/core';

import { BaseProductDto } from './base-product.dto';
import { ProductValidation } from '../product.constant';

export class CreateProductDto extends BaseProductDto {
  @ApiProperty({
    ...ApiPropertyOption.Product.AddedDate,
    required: false
  })
  @IsOptional()
  @IsString()
  @Matches(ProductValidation.AddedDate.Regexp, { message: ProductValidation.AddedDate.Message })
  public addedDate?: string;
}
