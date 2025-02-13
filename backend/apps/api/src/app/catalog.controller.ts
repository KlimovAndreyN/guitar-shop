import { Controller, Get, Query, Req, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { join } from 'path/posix';

import { RouteAlias, ApiOperationOption, ProductWithPaginationRdo, RequestWithRequestId } from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';
import { ProductApiResponse, ProductQuery } from '@backend/catalog/product'

import { CatalogService } from './catalog.service';

@ApiTags('catalog')
@Controller(join('catalog', RouteAlias.Products))
@UseFilters(AxiosExceptionFilter)
export class CatalogController {
  constructor(
    private readonly httpService: HttpService,
    private catalogService: CatalogService
  ) { }

  @ApiOperation(ApiOperationOption.Product.Index)
  @ApiResponse(ProductApiResponse.ProductFound)
  @ApiResponse(ProductApiResponse.BadRequest) //! проверять фильтрацию? что в ТЗ?
  @Get('')
  public async index(
    @Query() query: ProductQuery,
    @Req() { requestId }: RequestWithRequestId
  ): Promise<ProductWithPaginationRdo> {
    const url = this.catalogService.getProductsUrl(query);
    console.log('url', url);

    const headers = makeHeaders(requestId);
    const { data } = await this.httpService.axiosRef.get<ProductWithPaginationRdo>(url, headers);

    return data;
  }
}
