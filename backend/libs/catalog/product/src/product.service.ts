import { Inject, Injectable, Logger, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { join } from 'path/posix';

import { PaginationResult, RouteAlias } from '@backend/shared/core';
import { parseAxiosError, uploadFile } from '@backend/shared/helpers';
import { catalogConfig } from '@backend/catalog/config';
import { FILE_KEY, UploadedFileRdo } from '@backend/file-storage/file-uploader';

import { ProductEntity } from './product.entity';
import { ProductFactory } from './product.factory';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQuery } from './query/product.query';
import { SearchProductQuery } from './query/search-product.query';
import { ProductMessage, Default } from './product.constant';

@Injectable()
export class ProductService {
  @Inject(catalogConfig.KEY)
  private readonly catalogOptions: ConfigType<typeof catalogConfig>;

  constructor(
    private readonly blogPostRepository: ProductRepository
  ) { }

  //! StringsCountByGuitarType !
  /*
  private validatePostData(dto: CreatePostDto | UpdatePostDto, imageFile: Express.Multer.File): void {
    dto.imageFile = (imageFile) ? '/some/path' : undefined;

    const message = validatePostData(dto);

    if (message) {
      throw new BadRequestException(message);
    }
  }
  */

  private async uploadImageFile(imageFile: Express.Multer.File, requestId: string): Promise<string> {
    try {
      const fileRdo = await uploadFile<UploadedFileRdo>(
        join(this.catalogOptions.fileStorageServiceUrl, RouteAlias.Upload),
        imageFile,
        FILE_KEY,
        requestId
      );

      return join(fileRdo.subDirectory, fileRdo.hashName);
    } catch (error) {
      Logger.error(`UploadImageFile: ${parseAxiosError(error)}`, ProductService.name);

      throw new InternalServerErrorException('File upload error!');
    }
  }

  private checkAuthorization(userId: string): void {
    if (!userId) {
      throw new UnauthorizedException(ProductMessage.Unauthorized);
    }
  }

  public async findById(postId: string): Promise<ProductEntity> {
    const foundPost = await this.blogPostRepository.findById(postId);

    return foundPost;
  }

  public async getAllPosts(
    searchQuery: SearchProductQuery,
    currentUserId: string,
    checkAuthorization: boolean,
    showDraft: boolean
  ): Promise<PaginationResult<ProductEntity>> {
    if (checkAuthorization) {
      this.checkAuthorization(currentUserId);
    }

    const { page, sortType, tag, type, userId } = searchQuery;
    const query: ProductQuery = {
      page,
      sortType,
      tag,
      type,
      userIds: (userId) ? [userId] : undefined
    };
    const result = await this.blogPostRepository.find(query, showDraft, Default.PRODUCT_COUNT);

    return result;
  }

  public async getPost(postId: string, userId: string): Promise<ProductEntity> {
    this.checkAuthorization(userId);

    const post = await this.blogPostRepository.findById(postId);

    return post;
  }

  public async createPost(
    dto: CreateProductDto,
    imageFile: Express.Multer.File,
    userId: string,
    requestId: string
  ): Promise<ProductEntity> {
    this.checkAuthorization(userId);
    //!this.validatePostData(dto, imageFile);

    const imagePath = await this.uploadImageFile(imageFile, requestId);
    const newPost = ProductFactory.createFromDto(dto, imagePath);

    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async updatePost(
    postId: string,
    dto: UpdateProductDto,
    imageFile: Express.Multer.File,
    userId: string,
    requestId: string
  ): Promise<ProductEntity> {
    this.checkAuthorization(userId);
    //this.validatePostData(dto, imageFile);

    const existsPost = await this.blogPostRepository.findById(postId);

    //! а нужно ли?
    /*
    let hasChanges = false;

    // обнуляем поля, чтобы был null в БД
    // можно вынести отдельно
    Object.values(PostField).forEach((key) => {
      existsPost[key] = null;
    });
    existsPost.imagePath = null;

    for (const [key, value] of Object.entries(dto)) {
      if (key === PostField.ImageFile) {
        if (imageFile) {
          existsPost.imagePath = await this.uploadImageFile(imageFile, requestId);
          hasChanges = true;
        }
      }
      else {
        if (value !== undefined && existsPost[key] !== value) {
          existsPost[key] = value;
          hasChanges = true;
        }
      }
    }

    if (hasChanges) {
    */
    await this.blogPostRepository.update(existsPost);
    /*    }

    // поля с null в undefined, чтобы их небыло в rdo
    // можно вынести отдельно
    Object.values(PostField).forEach((key) => {
      if (existsPost[key] === null) {
        existsPost[key] = undefined;
      }
    });
    */

    if (existsPost.imagePath === null) {
      existsPost.imagePath = undefined;
    }

    return existsPost;
  }

  public async deletePost(postId: string, userId: string): Promise<void> {
    this.checkAuthorization(userId);
    await this.blogPostRepository.findById(postId);
    await this.blogPostRepository.deleteById(postId);
  }
}
