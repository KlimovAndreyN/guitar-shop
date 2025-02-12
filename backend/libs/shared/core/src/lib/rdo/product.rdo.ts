import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

import { transformDate } from '../utils/transform';
import { ApiPropertyOption } from '../constants/api-property-option';

export class ProductRdo {
  @ApiProperty(ApiPropertyOption.Product.Id)
  @Expose()
  public id: string;

  @ApiProperty(ApiPropertyOption.Product.Title)
  @Expose()
  public title: string;

  @ApiProperty(ApiPropertyOption.Product.AddedDate)
  @Transform(transformDate)
  @Expose()
  public addedDate: string;

  @ApiProperty(ApiPropertyOption.Product.ImagePath)
  @Expose()
  public imagePath: string;

  @ApiProperty(ApiPropertyOption.Product.Price)
  @Expose()
  price: number;
}
