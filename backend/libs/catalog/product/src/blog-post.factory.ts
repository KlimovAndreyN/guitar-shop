import { Injectable } from '@nestjs/common';

import { EntityFactory, Post } from '@backend/shared/core';

import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Default } from './blog-post.constant';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromDtoOrEntity(data: CreatePostDto | BlogPostEntity, imagePath: string, userId: string): BlogPostEntity {
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

    return new BlogPostEntity(post);
  }
}
