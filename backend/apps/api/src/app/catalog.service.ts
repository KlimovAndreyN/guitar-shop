import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { DetailProductRdo, RouteAlias } from '@backend/shared/core';
import { dtoToFormData, makeHeaders, makeUrl, multerFileToFormData } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';
import { CreateProductDto, ImageOption, UpdateProductDto } from '@backend/catalog/product';

@Injectable()
export class CatalogService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  public getProductsUrl(route = '', query: object = null): string {
    return makeUrl(this.apiOptions.catalogServiceUrl, RouteAlias.Products, route, query);
  }

  public async createOrUpdateProduct(
    productId: string,
    dto: CreateProductDto | UpdateProductDto,
    requestId: string,
    userId: string,
    imageFile?: Express.Multer.File
  ): Promise<DetailProductRdo> {
    const url = this.getProductsUrl(productId);
    const formData = new FormData();
    const headers = makeHeaders(requestId, null, userId);

    dtoToFormData(dto, formData);
    multerFileToFormData(imageFile, formData, ImageOption.KEY);

    const { data } =
      (!productId)
        ? await this.httpService.axiosRef.post<DetailProductRdo>(url, formData, headers)
        : await this.httpService.axiosRef.put<DetailProductRdo>(url, formData, headers);

    return data;
  }
}
