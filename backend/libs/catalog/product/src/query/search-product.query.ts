import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

import { ApiPropertyOption } from '@backend/shared/core';

import { BaseProductQuery } from './base-product.query';

export class SearchProductQuery extends BaseProductQuery {
  @ApiProperty({ ...ApiPropertyOption.User.Id, required: false })
  @IsString()
  @IsOptional()
  @IsMongoId()
  public userId?: string;
}
