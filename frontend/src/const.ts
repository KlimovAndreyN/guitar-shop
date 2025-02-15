import { GuitarType } from './types/backend';

export const MAIN_TITLE = 'Guitar-shop';

export const PageTitle = {
  Root: MAIN_TITLE,
  Registration: `Регистрация — ${MAIN_TITLE}`,
  Login: `Авторизация — ${MAIN_TITLE}`,
  Catalog: `Просмотр товаров — ${MAIN_TITLE}`,
  Product: `Товар — ${MAIN_TITLE}`,
  AddProduct: `Добавление товара — ${MAIN_TITLE}`,
  EditProduct: `Редактирование товара — ${MAIN_TITLE}`,
  NotFound: `404 — ${MAIN_TITLE}`
} as const;

export enum AppRoute {
  Root = '/',
  Register = '/register',
  Catalog = '/catalog',
  Product = '/catalog/product',
  Add = '/add',
  Edit = '/edit',
  NotFound = '/404',
}

export enum ApiRoute {
  Login = '/users/login',
  Check = '/users/check',
  Logout = '/users/logout',
  Register = 'users/register',
  Products = '/catalog/products',

  //!
  Offers = '/offers'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum Sorting {
  Popular = 'Popular',
  PriceIncrease = 'Price: low to high',
  PriceDecrease = 'Price: high to low',
  TopRated = 'Top rated first'
}

export enum StoreSlice {
  SiteData = 'SITE_DATA',
  SiteProcess = 'SITE_PROCESS',
  UserProcess = 'USER_PROCESS'
}

export enum HttpCode {
  NotFound = 404,
  NoAuth = 401
}

export const GuitarTypeTitle: { [key in GuitarType]: string } = {
  electro: 'Акустическая гитара',
  acoustic: 'Электрогитара',
  ukulele: 'Укулеле'
} as const;
