import { Injectable } from '@nestjs/common';

import { EntityFactory, Product } from '@backend/shared/core';

import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductFactory implements EntityFactory<ProductEntity> {
  public create(entityPlainData: Product): ProductEntity {
    return new ProductEntity(entityPlainData);
  }

  public static createFromDto(dto: CreateProductDto, imagePath: string): ProductEntity {
    const product: Product = {
      title: dto.title,
      description: dto.description,
      imagePath,
      guitarType: dto.guitarType,
      article: dto.article,
      stringsCount: dto.stringsCount,
      price: dto.price
    };

    return new ProductEntity(product);
  }
}
