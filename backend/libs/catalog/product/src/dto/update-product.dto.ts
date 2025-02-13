import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

import { ApiPropertyOption } from '@backend/shared/core';

import { BaseProductDto } from './base-product.dto';
import { ProductValidation } from '../product.constant';

export class UpdateProductDto extends BaseProductDto {
  @ApiProperty(ApiPropertyOption.Product.AddedDate)
  @IsString()
  @Matches(ProductValidation.AddedDate.Regexp, { message: ProductValidation.AddedDate.Message })
  public addedDate: string;
}
