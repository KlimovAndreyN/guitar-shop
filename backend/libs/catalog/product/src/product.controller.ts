import { Body, Controller, Delete, HttpCode, Param, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { fillDto } from '@backend/shared/helpers';
import {
  ApiParamOption, RequestWithRequestIdAndUserId, RouteAlias, ApiOperationOption,
  PRODUCT_ID_PARAM, ApiHeaderOption, DetailProductRdo, RequestWithUserId
} from '@backend/shared/core';
import { GuidValidationPipe } from '@backend/shared/pipes';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductApiResponse, ImageOption, parseFilePipeBuilder } from './product.constant';

@ApiTags('product')
@ApiHeader(ApiHeaderOption.UserId) // глобально вроде не добавить? и примеры почемуто не работают...
@Controller(RouteAlias.Products)
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) { }

  /*
  private async getPostsWithPagination(
    query: SearchProductQuery,
    checkAuthorization = false,
    userId?: string,
    showDraft = false
  ): Promise<PostWithUserIdAndPaginationRdo> {
    const postsWithPagination = await this.productService.getAllPosts(query, userId, checkAuthorization, showDraft);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO())
    }

    return fillDto(PostWithUserIdAndPaginationRdo, result);
  }

  @ApiOperation(ApiOperationOption.Post.Index)
  @ApiResponse(ProductApiResponse.PostsFound)
  @ApiResponse(ProductApiResponse.BadRequest)
  @Get('')
  public async index(@Query() query: SearchProductQuery): Promise<PostWithUserIdAndPaginationRdo> {
    const posts = await this.getPostsWithPagination(query);

    return posts;
  }

  @ApiOperation(ApiOperationOption.Post.Create)
  @ApiResponse(ProductApiResponse.PostFound)
  @ApiResponse(ProductApiResponse.PostNotFound)
  @ApiParam(ApiParamOption.PostId)
  @Get(POST_ID_PARAM)
  public async show(
    @Param(ApiParamOption.PostId.name, GuidValidationPipe) postId: string,
    @Req() { userId }: RequestWithUserId
  ): Promise<DetailPostWithUserIdRdo> {
    const existProduct = await this.productService.getPost(postId, userId);

    return fillDto(DetailPostWithUserIdRdo, existPost.toPOJO());
  }
  */

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
