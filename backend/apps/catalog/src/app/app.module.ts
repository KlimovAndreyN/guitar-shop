import { Module } from '@nestjs/common';

import { CatalogConfigModule } from '@backend/catalog/config';
import { ProductModule } from '@backend/catalog/product'

@Module({
  imports: [
    CatalogConfigModule,
    ProductModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
