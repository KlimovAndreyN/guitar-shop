import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogConfigModule, getMongooseOptions } from '@backend/catalog/config';
import { BlogPostModule } from '@backend/catalog/product'

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    BlogConfigModule,
    BlogPostModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
