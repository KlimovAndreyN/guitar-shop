import {
  Body, Controller, Delete, Get, HttpCode, Param, Patch, Query,
  Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { join } from 'path/posix';

import {
  RequestWithRequestIdAndUserId, RouteAlias, PageQuery, ApiParamOption,
} from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';


import { CheckAuthGuard } from './guards/check-auth.guard';
import { CatalogService } from './catalog.service';

@ApiTags('catalog')
@Controller(join('catalog', RouteAlias.Products))
@UseFilters(AxiosExceptionFilter)
export class CatalogController {
  constructor(
    private readonly httpService: HttpService,
    private catalogService: CatalogService
  ) { }
}
