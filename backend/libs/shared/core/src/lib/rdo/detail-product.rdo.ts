import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ProductRdo } from './product.rdo';
import { GuitarType } from '../types/guitar-type.enum';
import { StringsCount } from '../types/strings-count.type';
import { ApiPropertyOption } from '../constants/api-property-option';

export class DetailProductRdo extends ProductRdo {
  @ApiProperty(ApiPropertyOption.Product.Description)
  @Expose()
  public description: string;

  @ApiProperty(ApiPropertyOption.Product.GuitarType)
  @Expose()
  guitarType: GuitarType;

  @ApiProperty(ApiPropertyOption.Product.Article)
  @Expose()
  article: string;

  @ApiProperty(ApiPropertyOption.Product.StringsCount)
  @Expose()
  stringsCount: StringsCount;
}
