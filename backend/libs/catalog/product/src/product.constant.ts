import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

import { DetailProductRdo, GuitarType, ProductWithPaginationRdo, SortType } from '@backend/shared/core';

export const Default = {
  PRODUCT_COUNT: 7,
  SORT_TYPE: SortType.AddedDate
} as const;

export const ImageOption = {
  KEY: 'imageFile',
  MAX_SIZE: 2 * 1204 * 1024,
  MIME_TYPES: ['image/jpg', 'image/jpeg', 'image/png']
} as const;

export const ProductValidation = {
  Title: {
    MinLength: 10,
    MaxLength: 100
  },
  Description: {
    MinLength: 20,
    MaxLength: 1024
  },
  AddedDate: {
    Regexp: /^\d{2}\.\d{2}\.\d{4}$/,
    Message: 'addedDate format dd.mm.yyyy'
  },
  ImageFile: {
    Type: { fileType: ImageOption.MIME_TYPES.join('|') },
    MaxSize: { maxSize: ImageOption.MAX_SIZE },
    Build: {
      fileIsRequired: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }
  },
  Article: {
    MinLength: 5,
    MaxLength: 40
  },
  Price: {
    Min: 100,
    Max: 1000000
  }
} as const;

export const parseFilePipeBuilder =
  new ParseFilePipeBuilder()
    .addFileTypeValidator(ProductValidation.ImageFile.Type)
    .addMaxSizeValidator(ProductValidation.ImageFile.MaxSize)
    .build(ProductValidation.ImageFile.Build);

export const ProductQueryApiProperty = {
  SortType: {
    description: 'The sorting type',
    enum: SortType,
    example: SortType.AddedDate,
    required: false
  }
} as const;

//! сойдет? или объявить массивы StringsCount, а их подставить тут...
export const StringsCountByGuitarType = {
  [GuitarType.Acoustic]: [6, 7, 12],
  [GuitarType.Electro]: [4, 6, 7],
  [GuitarType.Ukulele]: [4]
} as const;

export const ProductMessage = {
  NotFound: 'Product not found.',
  Unauthorized: 'Unauthorized.'
} as const;

export const ProductApiResponse = {
  Unauthorized: {
    status: HttpStatus.UNAUTHORIZED,
    description: ProductMessage.Unauthorized
  },
  BadRequest: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.'
  },
  BadFile: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Bad file.'
  },
  ProductCreated: {
    type: DetailProductRdo,
    status: HttpStatus.CREATED,
    description: 'The new product has been successfully created.'
  },
  ProductUpdated: {
    type: DetailProductRdo,
    status: HttpStatus.OK,
    description: 'The product has been successfully updated.'
  },
  ProductDeleted: {
    status: HttpStatus.NO_CONTENT,
    description: 'The product has been successfully deleted.'
  },
  ProductFound: {
    type: DetailProductRdo,
    status: HttpStatus.OK,
    description: 'Product found.'
  },
  ProductsFound: {
    type: ProductWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Products found.'
  },
  ProductNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: ProductMessage.NotFound
  }
} as const;
