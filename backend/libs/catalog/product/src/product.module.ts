import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@backend/catalog/models';

import { BlogPostController } from './product.controller';
import { BlogPostFactory } from './product.factory';
import { BlogPostRepository } from './product.repository';
import { BlogPostService } from './product.service';

@Module({
  imports: [
    PrismaClientModule
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
