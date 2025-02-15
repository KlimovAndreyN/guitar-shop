import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { fillDto } from '@backend/shared/helpers';
import {
  ApiParamOption, RequestWithRequestIdAndUserId, ProductsWithPaginationRdo, ApiOperationOption,
  PRODUCT_ID_PARAM, ApiHeaderOption, DetailProductRdo, RequestWithUserId, RouteAlias

} from '@backend/shared/core';
import { GuidValidationPipe } from '@backend/shared/pipes';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQuery } from './query/product.query';
import { ProductApiResponse, ImageOption, parseFilePipeBuilder } from './product.constant';

@ApiTags('product')
@ApiHeader(ApiHeaderOption.UserId) // глобально вроде не добавить? и примеры почемуто не работают...
@Controller(RouteAlias.Products)
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) { }

  @ApiOperation(ApiOperationOption.Product.Index)
  @ApiResponse(ProductApiResponse.ProductFound)
  @ApiResponse(ProductApiResponse.Unauthorized)
  @ApiResponse(ProductApiResponse.BadRequest) //! проверять фильтрацию? что в ТЗ?
  @Get('')
  public async index(
    @Query() query: ProductQuery,
    @Req() { userId }: RequestWithUserId
  ): Promise<ProductsWithPaginationRdo> {
    const productsWithPagination = await this.productService.findProducts(query, userId);
    const result = {
      ...productsWithPagination,
      entities: productsWithPagination.entities.map((product) => product.toPOJO())
    }

    return fillDto(ProductsWithPaginationRdo, result);
  }

  @ApiOperation(ApiOperationOption.Product.Detail)
  @ApiResponse(ProductApiResponse.ProductFound)
  @ApiResponse(ProductApiResponse.Unauthorized)
  @ApiResponse(ProductApiResponse.ProductNotFound)
  @ApiResponse(ProductApiResponse.BadRequest)
  @ApiParam(ApiParamOption.ProductId)
  @Get(PRODUCT_ID_PARAM)
  public async show(
    @Param(ApiParamOption.ProductId.name, GuidValidationPipe) productId: string,
    @Req() { userId }: RequestWithUserId
  ): Promise<DetailProductRdo> {
    const existProduct = await this.productService.getProduct(productId, userId);

    return fillDto(DetailProductRdo, existProduct.toPOJO());
  }

  @ApiOperation(ApiOperationOption.Product.Create)
  @ApiResponse(ProductApiResponse.ProductCreated)
  @ApiResponse(ProductApiResponse.Unauthorized)
  @ApiResponse(ProductApiResponse.BadRequest)
  @ApiResponse(ProductApiResponse.BadFile)
  @ApiConsumes('multipart/form-data')
  @ApiHeader(ApiHeaderOption.RequestId)
  @UseInterceptors(FileInterceptor(ImageOption.KEY))
  @Post()
  public async create(
    @Body() dto: CreateProductDto,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId,
    @UploadedFile(parseFilePipeBuilder) imageFile?: Express.Multer.File
  ): Promise<DetailProductRdo> {
    console.log(dto);

    const newProduct = await this.productService.createProduct(dto, imageFile, userId, requestId);

    return fillDto(DetailProductRdo, newProduct.toPOJO());
  }

  @ApiOperation(ApiOperationOption.Product.Update)
  @ApiResponse(ProductApiResponse.ProductUpdated)
  @ApiResponse(ProductApiResponse.Unauthorized)
  @ApiResponse(ProductApiResponse.ProductNotFound)
  @ApiResponse(ProductApiResponse.BadRequest)
  @ApiResponse(ProductApiResponse.BadFile)
  @ApiParam(ApiParamOption.ProductId)
  @ApiConsumes('multipart/form-data')
  @ApiHeader(ApiHeaderOption.RequestId)
  @UseInterceptors(FileInterceptor(ImageOption.KEY))
  @Put(PRODUCT_ID_PARAM)
  public async update(
    @Param(ApiParamOption.ProductId.name, GuidValidationPipe) productId: string,
    @Body() dto: UpdateProductDto,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId,
    @UploadedFile(parseFilePipeBuilder) imageFile?: Express.Multer.File
  ): Promise<DetailProductRdo> {
    const updatedProduct = await this.productService.updateProduct(productId, dto, imageFile, userId, requestId);

    return fillDto(DetailProductRdo, updatedProduct.toPOJO());
  }

  @ApiOperation(ApiOperationOption.Product.Delete)
  @ApiResponse(ProductApiResponse.ProductDeleted)
  @ApiResponse(ProductApiResponse.Unauthorized)
  @ApiResponse(ProductApiResponse.ProductNotFound)
  @ApiParam(ApiParamOption.ProductId)
  @HttpCode(ProductApiResponse.ProductDeleted.status)
  @Delete(PRODUCT_ID_PARAM)
  public async delete(
    @Param(ApiParamOption.ProductId.name, GuidValidationPipe) productId: string,
    @Req() { userId }: RequestWithUserId
  ): Promise<void> {
    await this.productService.deleteProduct(productId, userId);
  }
}
