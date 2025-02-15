import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { join } from 'path/posix';

import {
  RouteAlias, ApiOperationOption, ProductsWithPaginationRdo, DetailProductRdo,
  BearerAuth, ApiParamOption, PRODUCT_ID_PARAM, RequestWithRequestIdAndUserId
} from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { GuidValidationPipe } from '@backend/shared/pipes';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';
import { CreateProductDto, ImageOption, parseFilePipeBuilder, ProductApiResponse, ProductQuery, UpdateProductDto } from '@backend/catalog/product'

import { CatalogService } from './catalog.service';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('catalog')
@Controller(join('catalog', RouteAlias.Products))
@ApiBearerAuth(BearerAuth.AccessToken)
@UseFilters(AxiosExceptionFilter)
export class CatalogController {
  constructor(
    private readonly httpService: HttpService,
    private catalogService: CatalogService
  ) { }

  @ApiOperation(ApiOperationOption.Product.Index)
  @ApiResponse(ProductApiResponse.ProductFound)
  @ApiResponse(ProductApiResponse.Unauthorized)
  @ApiResponse(ProductApiResponse.BadRequest) //! проверять фильтрацию? что в ТЗ?
  @UseGuards(CheckAuthGuard)
  @Get('')
  public async index(
    @Query() query: ProductQuery,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<ProductsWithPaginationRdo> {
    const url = this.catalogService.getProductsUrl('', query);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.get<ProductsWithPaginationRdo>(url, headers);

    return data;
  }

  @ApiOperation(ApiOperationOption.Product.Detail)
  @ApiResponse(ProductApiResponse.ProductFound)
  @ApiResponse(ProductApiResponse.Unauthorized)
  @ApiResponse(ProductApiResponse.ProductNotFound)
  @ApiParam(ApiParamOption.ProductId)
  @UseGuards(CheckAuthGuard)
  @Get(PRODUCT_ID_PARAM)
  public async show(
    @Param(ApiParamOption.ProductId.name, GuidValidationPipe) postId: string,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<DetailProductRdo> {
    const url = this.catalogService.getProductsUrl(postId);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.get<DetailProductRdo>(url, headers);

    return data;
  }

  @ApiOperation(ApiOperationOption.Product.Create)
  @ApiResponse(ProductApiResponse.ProductCreated)
  @ApiResponse(ProductApiResponse.Unauthorized)
  @ApiResponse(ProductApiResponse.BadRequest)
  @ApiResponse(ProductApiResponse.BadFile)
  @ApiConsumes('multipart/form-data')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(FileInterceptor(ImageOption.KEY))
  @Post()
  public async create(
    @Body() dto: CreateProductDto,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId,
    @UploadedFile(parseFilePipeBuilder) imageFile?: Express.Multer.File
  ): Promise<DetailProductRdo> {
    const product = await this.catalogService.createOrUpdateProduct(null, dto, requestId, userId, imageFile);

    return product;
  }

  @ApiOperation(ApiOperationOption.Product.Update)
  @ApiResponse(ProductApiResponse.ProductUpdated)
  @ApiResponse(ProductApiResponse.Unauthorized)
  @ApiResponse(ProductApiResponse.ProductNotFound)
  @ApiResponse(ProductApiResponse.BadRequest)
  @ApiResponse(ProductApiResponse.BadFile)
  @ApiParam(ApiParamOption.ProductId)
  @ApiConsumes('multipart/form-data')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(FileInterceptor(ImageOption.KEY))
  @Put(PRODUCT_ID_PARAM)
  public async update(
    @Param(ApiParamOption.ProductId.name, GuidValidationPipe) productId: string,
    @Body() dto: UpdateProductDto,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId,
    @UploadedFile(parseFilePipeBuilder) imageFile?: Express.Multer.File
  ): Promise<DetailProductRdo> {
    const product = await this.catalogService.createOrUpdateProduct(productId, dto, requestId, userId, imageFile);

    return product;
  }

  @ApiOperation(ApiOperationOption.Product.Delete)
  @ApiResponse(ProductApiResponse.ProductDeleted)
  @ApiResponse(ProductApiResponse.Unauthorized)
  @ApiResponse(ProductApiResponse.ProductNotFound)
  @ApiParam(ApiParamOption.ProductId)
  @UseGuards(CheckAuthGuard)
  @HttpCode(ProductApiResponse.ProductDeleted.status)
  @Delete(PRODUCT_ID_PARAM)
  public async delete(
    @Param(ApiParamOption.ProductId.name, GuidValidationPipe) productId: string,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<void> {
    const url = this.catalogService.getProductsUrl(productId);
    const headers = makeHeaders(requestId, null, userId);

    await this.httpService.axiosRef.delete(url, headers);
  }
}
