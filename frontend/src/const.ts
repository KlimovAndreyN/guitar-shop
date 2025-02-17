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
  ProductAdd = '/catalog/product/add',
  ProductEdit = '/catalog/product/:id/edit',
  NotFound = '/404',
}

export enum ApiRoute {
  Login = '/users/login',
  Check = '/users/check',
  Logout = '/users/logout',
  Register = 'users/register',
  Products = '/catalog/products',
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

export const STRINGS_COUNT_VALUES = [4, 6, 7, 12] as const;

export type StringsCount = typeof STRINGS_COUNT_VALUES[number];

export enum GuitarType {
  Electro = 'electro',
  Acoustic = 'acoustic',
  Ukulele = 'ukulele'
}

export const GuitarTypeTitle: { [key in GuitarType]: string } = {
  acoustic: 'Акустическая гитара',
  electro: 'Электрогитара',
  ukulele: 'Укулеле'
} as const;
