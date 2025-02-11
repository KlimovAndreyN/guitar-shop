import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogConfigModule, getMongooseOptions } from '@backend/blog/config';
import { BlogPostModule } from '@backend/blog/blog-post'
import { BlogPostCommentModule } from '@backend/blog/blog-post-comment';
import { BlogPostLikeModule } from '@backend/blog/blog-post-like';
import { BlogSubscriptionModule } from '@backend/blog/blog-subscription';
import { NewsLetterModule } from '@backend/blog/news-letter';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    BlogConfigModule,
    BlogPostModule,
    BlogPostCommentModule,
    BlogPostLikeModule,
    BlogSubscriptionModule,
    NewsLetterModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
