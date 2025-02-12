import { Module } from '@nestjs/common';

import { CatalogConfigModule } from '@backend/catalog/config';
import { BlogPostModule } from '@backend/catalog/product'

@Module({
  imports: [
    CatalogConfigModule,
    BlogPostModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
