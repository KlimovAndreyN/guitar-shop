import {
  BadRequestException, ForbiddenException, Inject, Injectable, Logger,
  InternalServerErrorException, NotFoundException, UnauthorizedException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { join } from 'path/posix';

import { PaginationResult, PostState, RouteAlias } from '@backend/shared/core';
import { parseAxiosError, uploadFile } from '@backend/shared/helpers';
import { catalogConfig } from '@backend/catalog/config';
import { FILE_KEY, UploadedFileRdo } from '@backend/file-storage/file-uploader';

import { ProductEntity } from './product.entity';
import { ProductFactory } from './product.factory';
import { ProductRepository } from './product.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ProductQuery } from './query/product.query';
import { SearchProductQuery } from './query/search-product.query';
import { ProductMessage, Default, PostField } from './product.constant';
import { validatePostData } from './product.validate.post.data';

@Injectable()
export class ProductService {
  @Inject(catalogConfig.KEY)
  private readonly catalogOptions: ConfigType<typeof catalogConfig>;

  constructor(
    private readonly blogPostRepository: ProductRepository
  ) { }

  private validatePostData(dto: CreatePostDto | UpdatePostDto, imageFile: Express.Multer.File): void {
    dto.imageFile = (imageFile) ? '/some/path' : undefined;

    const message = validatePostData(dto);

    if (message) {
      throw new BadRequestException(message);
    }
  }

  private async uploadImageFile(imageFile: Express.Multer.File, requestId: string): Promise<string> {
    if (!imageFile) {
      return undefined;
    }

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

  private isPublishedPost(post: ProductEntity): boolean {
    return post.state === PostState.Published;
  }

  private checkAuthorization(userId: string): void {
    if (!userId) {
      throw new UnauthorizedException(ProductMessage.Unauthorized);
    }
  }

  private canChangePost(post: ProductEntity, userId: string): void {
    if (post.userId !== userId) {
      throw new ForbiddenException(ProductMessage.NotAllow);
    }
  }

  private throwIfPostNotPublished(post: ProductEntity): void {
    if (!this.isPublishedPost(post)) {
      throw new NotFoundException(ProductMessage.NotFound);
    }
  }

  public canViewPost(post: ProductEntity, userId: string): void {
    if (post.userId !== userId) {
      this.throwIfPostNotPublished(post);
    }
  }

  public canCommentPost(post: ProductEntity): void {
    this.throwIfPostNotPublished(post);
  }

  public canLikePost(post: ProductEntity): void {
    this.throwIfPostNotPublished(post);
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
    const result = await this.blogPostRepository.find(query, showDraft, Default.POST_COUNT);

    return result;
  }

  public async getPost(postId: string, userId: string): Promise<ProductEntity> {
    const post = await this.blogPostRepository.findById(postId);
    // проверяем кто просмтаривает... автор или нет? опубликованные доступны всем, черновики только автору
    this.canViewPost(post, userId);

    return post;
  }

  public async createPost(
    dto: CreatePostDto,
    imageFile: Express.Multer.File,
    userId: string,
    requestId: string
  ): Promise<ProductEntity> {
    this.checkAuthorization(userId);
    this.validatePostData(dto, imageFile);

    const imagePath = await this.uploadImageFile(imageFile, requestId);
    const newPost = ProductFactory.createFromDtoOrEntity(dto, imagePath, userId);

    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async updatePost(
    postId: string,
    dto: UpdatePostDto,
    imageFile: Express.Multer.File,
    userId: string,
    requestId: string
  ): Promise<ProductEntity> {
    this.checkAuthorization(userId);
    this.validatePostData(dto, imageFile);

    const existsPost = await this.blogPostRepository.findById(postId);

    this.canChangePost(existsPost, userId);

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
      await this.blogPostRepository.update(existsPost);
    }

    // поля с null в undefined, чтобы их небыло в rdo
    // можно вынести отдельно
    Object.values(PostField).forEach((key) => {
      if (existsPost[key] === null) {
        existsPost[key] = undefined;
      }
    });

    if (existsPost.imagePath === null) {
      existsPost.imagePath = undefined;
    }

    return existsPost;
  }

  public async deletePost(postId: string, userId: string): Promise<void> {
    this.checkAuthorization(userId);

    const existsPost = await this.blogPostRepository.findById(postId);

    this.canChangePost(existsPost, userId);
    await this.blogPostRepository.deleteById(postId);
  }
}
