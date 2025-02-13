import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { PageQuery, SortType } from '@backend/shared/core';

import { Default, ProductQueryApiProperty } from '../product.constant';

export class BaseProductQuery extends PageQuery {
  @ApiProperty(ProductQueryApiProperty.SortType)
  @IsEnum(SortType)
  @IsOptional()
  public sortType?: SortType = Default.SORT_TYPE;
}
