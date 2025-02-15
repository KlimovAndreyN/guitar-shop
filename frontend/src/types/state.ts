import store from '../store';
import type { SortName, User } from './types';
import { DetailProduct, ProductsWithPagination } from './backend';
import { AuthorizationStatus } from '../const';

export type SiteData = {
    productsWithPagination: ProductsWithPagination | null;
    isProductsLoading: boolean;
    product: DetailProduct | null;
    isProductLoading: boolean;
};

export type SiteProcess = {
    page: number;
    sorting: SortName;
}

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    userName: User['name'];
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
