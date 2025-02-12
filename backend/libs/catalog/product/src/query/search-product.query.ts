import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

import { ApiPropertyOption } from '@backend/shared/core';

import { BaseBlogPostQuery } from './base-product.query';

export class SearchBlogPostQuery extends BaseBlogPostQuery {
  @ApiProperty({ ...ApiPropertyOption.User.Id, required: false })
  @IsString()
  @IsOptional()
  @IsMongoId()
  public userId?: string;
}
