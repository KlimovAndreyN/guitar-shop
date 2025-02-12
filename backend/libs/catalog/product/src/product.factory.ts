import { Injectable } from '@nestjs/common';

import { EntityFactory, Post } from '@backend/shared/core';

import { ProductEntity } from './product.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Default } from './product.constant';

@Injectable()
export class ProductFactory implements EntityFactory<ProductEntity> {
  public create(entityPlainData: Post): ProductEntity {
    return new ProductEntity(entityPlainData);
  }

  public static createFromDtoOrEntity(data: CreatePostDto | ProductEntity, imagePath: string, userId: string): ProductEntity {
    const post: Post = {
      type: data.type,
      state: Default.NEW_POST_STATE,
      userId,
      title: data.title,
      url: data.url,
      previewText: data.previewText,
      text: data.text,
      quoteText: data.quoteText,
      quoteAuthor: data.quoteAuthor,
      imagePath,
      linkDescription: data.linkDescription
    };

    return new ProductEntity(post);
  }
}
