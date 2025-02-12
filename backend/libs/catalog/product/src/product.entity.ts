import { Entity, StorableEntity, Product, GuitarType, StringsCount } from '@backend/shared/core';

export class ProductEntity extends Entity implements StorableEntity<Product> {
  public title: string;
  public description: string;
  public addedDate?: Date;
  public imagePath: string;
  public guitarType: GuitarType;
  public article: string;
  public stringsCount: StringsCount;
  public price: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(product?: Product) {
    super();

    this.populate(product);
  }

  public populate(product?: Product): void {
    if (!product) {
      return;
    }

    this.id = product.id ?? undefined;
    this.title = product.title;
    this.description = product.description ?? undefined;
    this.addedDate = product.addedDate ?? undefined;
    this.imagePath = product.imagePath ?? undefined;
    this.guitarType = product.guitarType ?? undefined;
    this.article = product.article ?? undefined;
    this.stringsCount = product.stringsCount ?? undefined;
    this.price = product.price ?? undefined;
    this.createdAt = product.createdAt ?? undefined;
    this.updatedAt = product.updatedAt ?? undefined;
  }

  public toPOJO(): Product {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      addedDate: this.addedDate,
      imagePath: this.imagePath,
      guitarType: this.guitarType,
      article: this.article,
      stringsCount: this.stringsCount,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
