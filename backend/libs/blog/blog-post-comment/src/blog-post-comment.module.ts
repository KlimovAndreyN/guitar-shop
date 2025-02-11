import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@backend/blog/models';
import { BlogPostModule } from '@backend/blog/blog-post';

import { BlogPostCommentController } from './blog-post-comment.controller';
import { BlogPostCommentFactory } from './blog-post-comment.factory';
import { BlogPostCommentRepository } from './blog-post-comment.repository';
import { BlogPostCommentService } from './blog-post-comment.service';

@Module({
  imports: [
    PrismaClientModule,
    BlogPostModule
  ],
  controllers: [BlogPostCommentController],
  providers: [
    BlogPostCommentService,
    BlogPostCommentRepository,
    BlogPostCommentFactory
  ]
})
export class BlogPostCommentModule { }
