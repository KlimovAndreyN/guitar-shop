import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@backend/blog/models';

import { BlogTagFactory } from './blog-tag.factory';
import { BlogTagRepository } from './blog-tag.repository';
import { BlogTagService } from './blog-tag.service';

@Module({
  imports: [PrismaClientModule],
  providers: [
    BlogTagService,
    BlogTagRepository,
    BlogTagFactory
  ],
  exports: [BlogTagService]
})
export class BlogTagModule { }
