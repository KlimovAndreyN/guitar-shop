import { ApiPropertyOption } from './api-property-option';

export const ApiParamOption = {
  ProductId: {
    name: 'productId',
    schema: ApiPropertyOption.Product.Id
  }
} as const;

export const PRODUCT_ID_PARAM = `:${ApiParamOption.ProductId.name}`;
