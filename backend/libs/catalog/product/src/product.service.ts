import { Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { join } from 'path/posix';

import { parseAxiosError, uploadFile } from '@backend/shared/helpers';
import { PaginationResult, RouteAlias } from '@backend/shared/core';
import { catalogConfig } from '@backend/catalog/config';
import { FILE_KEY, UploadedFileRdo } from '@backend/file-storage/file-uploader';

import { ProductEntity } from './product.entity';
import { ProductFactory } from './product.factory';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQuery } from './query/product.query';
import { Default, ProductMessage } from './product.constant';

@Injectable()
export class ProductService {
  @Inject(catalogConfig.KEY)
  private readonly catalogOptions: ConfigType<typeof catalogConfig>;

  constructor(
    private readonly productRepository: ProductRepository
  ) { }

  //! StringsCountByGuitarType !
  /*
  private validateProductData(dto: CreateProductDto | UpdateProductDto): void {
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
        [this.catalogOptions.fileStorageServiceUrl, RouteAlias.Upload].join('/'),
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

  public async findProducts(productQuery: ProductQuery, userId: string): Promise<PaginationResult<ProductEntity>> {
    this.checkAuthorization(userId);

    const result = await this.productRepository.find(productQuery, Default.PRODUCT_COUNT);

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
    //!this.validateProductData(dto); // StringsCountByGuitarType

    const imagePath = await this.uploadImageFile(imageFile, requestId);
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
    //!this.validateProductData(dto); // StringsCountByGuitarType

    const existsProduct = await this.productRepository.findById(productId);
    const imagePath = await this.uploadImageFile(imageFile, requestId);
    const product = ProductFactory.createFromDto(dto, imagePath);

    product.id = existsProduct.id;
    await this.productRepository.update(product);

    return product;
  }

  public async deleteProduct(productId: string, userId: string): Promise<void> {
    this.checkAuthorization(userId);
    await this.productRepository.findById(productId);
    await this.productRepository.deleteById(productId);
  }
}
