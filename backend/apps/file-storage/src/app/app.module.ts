import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileStorageConfigModule, getMongooseOptions } from '@backend/file-storage/config';
import { FileUploaderModule } from '@backend/file-storage/file-uploader';

@Module({
  imports: [
    FileUploaderModule,
    FileStorageConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
