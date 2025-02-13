import {
  Body, Controller, Delete, Get, HttpCode, Param, Patch,
  Post, Query, Req, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { ApiConsumes, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { fillDto } from '@backend/shared/helpers';
import {
  ApiParamOption, RequestWithRequestIdAndUserId, RequestWithUserId, RouteAlias, ApiOperationOption,
  PRODUCT_ID_PARAM, ApiHeaderOption, DetailProductRdo, ProductWithPaginationRdo
} from '@backend/shared/core';
import { GuidValidationPipe } from '@backend/shared/pipes';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductQuery } from './query/search-product.query';
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
  @ApiConsumes('multipart/form-data')
  @ApiHeader(ApiHeaderOption.RequestId)
  @UseInterceptors(FileInterceptor(ImageOption.KEY))
  @Post()
  public async create(
    @Body() dto: CreateProductDto,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId,
    @UploadedFile(parseFilePipeBuilder) imageFile?: Express.Multer.File
  ): Promise<DetailProductRdo> {
    const newProduct = await this.productService.createProduct(dto, imageFile, userId, requestId);

    return fillDto(DetailProductRdo, newProduct.toPOJO());
  }

  /*
  @ApiOperation(ApiOperationOption.Post.Update)
  @ApiResponse(ProductApiResponse.PostUpdated)
  @ApiResponse(ProductApiResponse.Unauthorized)
  @ApiResponse(ProductApiResponse.PostNotFound)
  @ApiResponse(ProductApiResponse.NotAllow)
  @ApiParam(ApiParamOption.PostId)
  @ApiConsumes('multipart/form-data')
  @ApiHeader(ApiHeaderOption.RequestId)
  @UseInterceptors(FileInterceptor(ImageOption.KEY))
  @Patch(POST_ID_PARAM)
  public async update(
    @Param(ApiParamOption.PostId.name, GuidValidationPipe) postId: string,
    @Body() dto: UpdatePostDto,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId,
    @UploadedFile(parseFilePipeBuilder) imageFile?: Express.Multer.File
  ): Promise<DetailPostWithUserIdRdo> {
    const updatedPost = await this.productService.updatePost(postId, dto, imageFile, userId, requestId);

    return fillDto(DetailPostWithUserIdRdo, updatedPost.toPOJO());
  }

  @ApiOperation(ApiOperationOption.Post.Delete)
  @ApiResponse(ProductApiResponse.PostDeleted)
  @ApiResponse(ProductApiResponse.Unauthorized)
  @ApiResponse(ProductApiResponse.PostNotFound)
  @ApiResponse(ProductApiResponse.NotAllow)
  @ApiParam(ApiParamOption.PostId)
  @HttpCode(ProductApiResponse.PostDeleted.status)
  @Delete(POST_ID_PARAM)
  public async delete(
    @Param(ApiParamOption.PostId.name, GuidValidationPipe) postId: string,
    @Req() { userId }: RequestWithUserId
  ): Promise<void> {
    await this.productService.deletePost(postId, userId);
  }
    */
}
