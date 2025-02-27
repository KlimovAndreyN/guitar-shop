import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import 'multer'; // Express.Multer.File

import { RouteAlias } from '@backend/shared/core';
import { MongoIdValidationPipe } from '@backend/shared/pipes';
import { fillDto } from '@backend/shared/helpers';

import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { FileUploaderService } from './file-uploader.service';
import { FILE_KEY, FileIdApiParam, FileUploaderApiResponse, FileUploaderFileApiBody } from './file-uploader.constant';

@ApiTags('file-upload')
@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService
  ) { }

  @ApiResponse(FileUploaderApiResponse.FileUploaded)
  @ApiResponse(FileUploaderApiResponse.BadRequest)
  @ApiConsumes('multipart/form-data')
  @ApiBody(FileUploaderFileApiBody)
  @Post(RouteAlias.Upload)
  @UseInterceptors(FileInterceptor(FILE_KEY))
  public async uploadFile(@UploadedFile(FILE_KEY) file: Express.Multer.File): Promise<UploadedFileRdo> {
    const fileEntity = await this.fileUploaderService.saveFile(file);

    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @ApiResponse(FileUploaderApiResponse.FileFound)
  @ApiResponse(FileUploaderApiResponse.FileNotFound)
  @ApiResponse(FileUploaderApiResponse.BadRequest)
  @ApiParam(FileIdApiParam)
  @Get(`:${FileIdApiParam.name}`)
  public async show(@Param(FileIdApiParam.name, MongoIdValidationPipe) fileId: string): Promise<UploadedFileRdo> {
    const existFile = await this.fileUploaderService.getFile(fileId);

    return fillDto(UploadedFileRdo, existFile);
  }
}
