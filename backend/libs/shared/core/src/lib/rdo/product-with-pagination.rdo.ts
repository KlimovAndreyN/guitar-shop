import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ProductRdo } from './product.rdo';
import { PaginationRdo } from './pagination.rdo';
import { ApiPropertyOption } from '../constants/api-property-option';

export class ProductWithPaginationRdo extends PaginationRdo {
  @ApiProperty(ApiPropertyOption.Product.Entities)
  @Type(() => ProductRdo)
  @Expose()
  public entities: ProductRdo[];
}
