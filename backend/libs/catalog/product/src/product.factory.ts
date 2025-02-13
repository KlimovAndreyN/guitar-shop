import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

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
    const { addedDate } = dto;

    if (addedDate) {
      const [day, month, year] = addedDate.split('.');

      product.addedDate = dayjs([year, month, day].join('-')).toDate();
    }

    return new ProductEntity(product);
  }
}
