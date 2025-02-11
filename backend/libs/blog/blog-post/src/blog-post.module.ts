import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@backend/blog/models';
import { BlogTagModule } from '@backend/blog/blog-tag';
import { BlogSubscriptionModule } from '@backend/blog/blog-subscription';

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
