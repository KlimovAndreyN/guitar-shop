import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaClientService } from '@backend/catalog/models';
import { BasePostgresRepository } from '@backend/shared/data-access';
import { GuitarType, PaginationResult, Product, StringsCount } from '@backend/shared/core';

import { ProductEntity } from './product.entity';
import { ProductFactory } from './product.factory';
import { ProductQuery } from './query/product.query';
import { ProductMessage } from './product.constant';

@Injectable()
export class ProductRepository extends BasePostgresRepository<ProductEntity, Product> {
  constructor(
    entityFactory: ProductFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private getGuitarTypeAndStringsCount({ guitarType, stringsCount }): { guitarType: GuitarType, stringsCount: StringsCount } {
    return {
      guitarType: guitarType as GuitarType,
      stringsCount: stringsCount as StringsCount
    };
  }

  private getProductsCount(where: Prisma.ProductWhereInput): Promise<number> {
    return this.client.product.count({ where });
  }

  private async findProducts(
    where: Prisma.ProductWhereInput,
    orderBy: Prisma.ProductOrderByWithRelationInput = undefined,
    skip: number = undefined,
    take: number = undefined
  ): Promise<ProductEntity[]> {
    const records = await this.client.product.findMany({ where, orderBy, skip, take });
    const entities = records.map(
      (record) => {
        const product: Product = {
          ...record,
          ...this.getGuitarTypeAndStringsCount(record)
        };

        return this.createEntityFromDocument(product);
      }
    );

    return entities;
  }

  private calculateProductsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async findById(id: string): Promise<ProductEntity> {
    const record = await this.client.product.findFirst({ where: { id } });

    if (!record) {
      throw new NotFoundException(ProductMessage.NotFound);
    }

    const product: Product = {
      ...record,
      ...this.getGuitarTypeAndStringsCount(record)
    };

    return this.createEntityFromDocument(product);
  }

  public async save(entity: ProductEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.product.create({
      data: { ...pojoEntity }
    });

    entity.id = record.id;
    entity.addedDate = record.addedDate;
  }

  public async update(entity: ProductEntity): Promise<void> {
    const { id } = entity;
    const pojoEntity = entity.toPOJO();
    const addedDate = new Date(pojoEntity.addedDate);

    await this.client.product.update({
      where: { id },
      data: {
        ...pojoEntity,
        addedDate
      }
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.product.delete({ where: { id } })
  }

  public async find(query: ProductQuery, take: number): Promise<PaginationResult<ProductEntity>> {
    const currentPage = query.page;
    const skip = (currentPage - 1) * take;
    const where: Prisma.ProductWhereInput = {};
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};

    //!
    /*
    if (query.type) {
      where.type = query.type;
    }

    switch (query.sortType) {
      case SortType.PublishDate:
        orderBy.publishDate = SortDirection.Desc;
        break;
      case SortType.CreateDate:
        orderBy.createdAt = SortDirection.Desc;
        break;
      case SortType.Comments:
        orderBy.commentsCount = SortDirection.Desc;
        break;
      case SortType.Likes:
        orderBy.likesCount = SortDirection.Desc;
        break;
    }
    */

    const [entities, productsCount] = await Promise.all(
      [
        this.findProducts(where, orderBy, skip, take),
        this.getProductsCount(where)
      ]
    );

    return {
      entities,
      currentPage,
      totalPages: this.calculateProductsPage(productsCount, take),
      itemsPerPage: take,
      totalItems: productsCount
    }
  }
}
