import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@backend/catalog/models';
import { BlogTagModule } from '@backend/catalog/blog-tag';
import { BlogSubscriptionModule } from '@backend/catalog/blog-subscription';

import { BlogPostController } from './blog-post.controller';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostService } from './blog-post.service';

@Module({
  imports: [
    PrismaClientModule,
    BlogTagModule,
    BlogSubscriptionModule
  ],
  controllers: [BlogPostController],
  providers: [
    BlogPostService,
    BlogPostRepository,
    BlogPostFactory
  ],
  exports: [BlogPostService]
})
export class BlogPostModule { }
