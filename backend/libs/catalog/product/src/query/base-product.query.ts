import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { ApiPropertyOption, PageQuery, PostType, SortType } from '@backend/shared/core';

import { Default, PostValidation, PostQueryApiProperty } from '../product.constant';

export class BaseBlogPostQuery extends PageQuery {
  @ApiProperty(PostQueryApiProperty.SortType)
  @IsEnum(SortType)
  @IsOptional()
  public sortType?: SortType = Default.SORT_TYPE;

  @ApiProperty({ ...ApiPropertyOption.Post.Type, required: false })
  @IsEnum(PostType)
  @IsOptional()
  public type?: PostType;

  @ApiProperty(PostQueryApiProperty.Tag)
  @IsString()
  @Matches(PostValidation.Tags.TagRegexp)
  @MinLength(PostValidation.Tags.TagMinLength)
  @MaxLength(PostValidation.Tags.TagMaxLength)
  @IsOptional()
  public tag?: string;
}
