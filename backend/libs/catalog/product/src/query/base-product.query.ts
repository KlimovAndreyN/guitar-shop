import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { ApiPropertyOption, PageQuery, SortType } from '@backend/shared/core';

import { Default, ProductValidation, ProductQueryApiProperty } from '../product.constant';

export class BaseProductQuery extends PageQuery {
  @ApiProperty(ProductQueryApiProperty.SortType)
  @IsEnum(SortType)
  @IsOptional()
  public sortType?: SortType = Default.SORT_TYPE;
}
