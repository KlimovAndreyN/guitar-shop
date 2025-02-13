import { Controller, Get, Param, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { join } from 'path/posix';

import {
  RouteAlias, ApiOperationOption, ProductWithPaginationRdo, RequestWithRequestId,
  BearerAuth, ApiParamOption, PRODUCT_ID_PARAM, DetailProductRdo, RequestWithRequestIdAndUserId
} from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { GuidValidationPipe } from '@backend/shared/pipes';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';
import { ProductApiResponse, ProductQuery } from '@backend/catalog/product'

import { CatalogService } from './catalog.service';
import { CheckAuthGuard } from './guards/check-auth.guard';

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
    const url = this.catalogService.getProductsUrl('', query);
    console.log('url', url);

    const headers = makeHeaders(requestId);
    const { data } = await this.httpService.axiosRef.get<ProductWithPaginationRdo>(url, headers);

    return data;
  }

  @ApiOperation(ApiOperationOption.Product.Detail)
  @ApiResponse(ProductApiResponse.ProductFound)
  @ApiResponse(ProductApiResponse.ProductNotFound)
  @ApiParam(ApiParamOption.ProductId)
  @ApiBearerAuth(BearerAuth.AccessToken)
  @UseGuards(CheckAuthGuard)
  @Get(PRODUCT_ID_PARAM)
  public async show(
    @Param(ApiParamOption.ProductId.name, GuidValidationPipe) postId: string,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<DetailProductRdo> {
    const url = this.catalogService.getProductsUrl(postId);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.get<DetailProductRdo>(url, headers);

    return data;
  }
}
