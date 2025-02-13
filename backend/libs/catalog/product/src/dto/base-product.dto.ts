import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsInt, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

import { ApiPropertyOption, GuitarType, STRINGS_COUNT_VALUES, StringsCount, transformNumber } from '@backend/shared/core';

import { ProductValidation } from '../product.constant';

export class BaseProductDto {
  @ApiProperty(ApiPropertyOption.Product.Title)
  @IsString()
  @MinLength(ProductValidation.Title.MinLength)
  @MaxLength(ProductValidation.Title.MaxLength)
  public title: string;

  @ApiProperty(ApiPropertyOption.Product.Description)
  @IsString()
  @MinLength(ProductValidation.Description.MinLength)
  @MaxLength(ProductValidation.Description.MaxLength)
  public description: string;

  @ApiProperty(ApiPropertyOption.Product.ImageFile)
  //!@IsString()
  public imageFile: string;

  @ApiProperty(ApiPropertyOption.Product.GuitarType)
  @IsString()
  @IsEnum(GuitarType)
  public guitarType: GuitarType;

  @ApiProperty(ApiPropertyOption.Product.Article)
  @IsString()
  @MinLength(ProductValidation.Article.MinLength)
  @MaxLength(ProductValidation.Article.MaxLength)
  public article: string;

  @ApiProperty(ApiPropertyOption.Product.StringsCount)
  @Transform(transformNumber)
  @IsInt()
  @IsIn(STRINGS_COUNT_VALUES)
  public stringsCount: StringsCount;

  @ApiProperty(ApiPropertyOption.Product.Price)
  @Transform(transformNumber)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(ProductValidation.Price.Min)
  @Max(ProductValidation.Price.Max)
  public price: number;
}
