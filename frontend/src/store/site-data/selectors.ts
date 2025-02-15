import { DetailProduct, ProductsWithPagination } from '../../types/backend';
import type { State } from '../../types/state';
import { StoreSlice } from '../../const';

export const getIsProductsLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean => SITE_DATA.isProductsLoading;
export const getProductsWithPagination = ({ [StoreSlice.SiteData]: SITE_DATA }: State): ProductsWithPagination | null => SITE_DATA.productsWithPagination;

export const getIsProductLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean => SITE_DATA.isProductLoading;
export const getProduct = ({ [StoreSlice.SiteData]: SITE_DATA }: State): DetailProduct | null => SITE_DATA.product;
