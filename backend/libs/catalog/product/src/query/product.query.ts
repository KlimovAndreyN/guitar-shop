import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { PageQuery, SortDirection, SortType } from '@backend/shared/core';

import { Default, ProductQueryApiProperty } from '../product.constant';

export class ProductQuery extends PageQuery {
  @ApiProperty(ProductQueryApiProperty.SortType)
  @IsEnum(SortType)
  @IsOptional()
  public sortType?: SortType = Default.SORT_TYPE;

  @ApiProperty(ProductQueryApiProperty.SortDirection)
  @IsEnum(SortDirection)
  @IsOptional()
  public sortDirection?: SortDirection = Default.SORT_DIRECTION;
}
