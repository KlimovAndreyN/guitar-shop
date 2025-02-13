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
    private readonly productRepository: ProductRepository
  ) { }

  //! StringsCountByGuitarType !
  /*
  private validateProductData(dto: CreateProductDto | UpdateProductDto, imageFile: Express.Multer.File): void {
    dto.imageFile = (imageFile) ? '/some/path' : undefined;

    const message = validateProductData(dto);

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

  public async findById(productId: string): Promise<ProductEntity> {
    const foundProduct = await this.productRepository.findById(productId);

    return foundProduct;
  }

  public async getAllProducts(
    searchQuery: SearchProductQuery,
    currentUserId: string,
    checkAuthorization: boolean,
    showDraft: boolean
  ): Promise<PaginationResult<ProductEntity>> {
    if (checkAuthorization) {
      this.checkAuthorization(currentUserId);
    }

    const { page, sortType, userId } = searchQuery;
    const query: ProductQuery = {
      page,
      sortType,
      userIds: (userId) ? [userId] : undefined
    };
    const result = await this.productRepository.find(query, showDraft, Default.PRODUCT_COUNT);

    return result;
  }

  public async getProduct(productId: string, userId: string): Promise<ProductEntity> {
    this.checkAuthorization(userId);

    const product = await this.productRepository.findById(productId);

    return product;
  }

  public async createProduct(
    dto: CreateProductDto,
    imageFile: Express.Multer.File,
    userId: string,
    requestId: string
  ): Promise<ProductEntity> {
    this.checkAuthorization(userId);
    //!this.validateProductData(dto, imageFile);

    //!const imagePath = await this.uploadImageFile(imageFile, requestId);
    const imagePath = '/some/file';
    const newProduct = ProductFactory.createFromDto(dto, imagePath);

    await this.productRepository.save(newProduct);

    return newProduct;
  }

  public async updateProduct(
    productId: string,
    dto: UpdateProductDto,
    imageFile: Express.Multer.File,
    userId: string,
    requestId: string
  ): Promise<ProductEntity> {
    this.checkAuthorization(userId);
    //this.validateProductData(dto, imageFile);

    const existsProduct = await this.productRepository.findById(productId);

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
    await this.productRepository.update(existsProduct);
    /*    }

    // поля с null в undefined, чтобы их небыло в rdo
    // можно вынести отдельно
    Object.values(PostField).forEach((key) => {
      if (existsPost[key] === null) {
        existsPost[key] = undefined;
      }
    });
    */

    if (existsProduct.imagePath === null) {
      existsProduct.imagePath = undefined;
    }

    return existsProduct;
  }

  public async deleteProduct(productId: string, userId: string): Promise<void> {
    this.checkAuthorization(userId);
    await this.productRepository.findById(productId);
    await this.productRepository.deleteById(productId);
  }
}
