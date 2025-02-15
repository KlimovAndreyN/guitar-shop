import store from '../store';
import type { Offer, Comment, City, SortName, User } from './types';
import { DetailProduct, ProductsWithPagination } from '../utils/backend';
import { AuthorizationStatus, SubmitStatus } from '../const';

export type SiteData = {
    productsWithPagination: ProductsWithPagination | null;
    isProductsLoading: boolean;
    product: DetailProduct | null;
    isProductLoading: boolean;

    offers: Offer[];
    isOffersLoading: boolean;
    offer: Offer | null;
    isOfferLoading: boolean;
    favoriteOffers: Offer[];
    isFavoriteOffersLoading: boolean;
    premiumOffers: Offer[];
    comments: Comment[];
    commentStatus: SubmitStatus;
};

export type SiteProcess = {
    page: number;
    sorting: SortName;

    city: City;
}

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    userName: User['name'];
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
