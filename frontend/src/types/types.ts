import { Sorting, GuitarType, StringsCount } from '../const';

export type SortName = keyof typeof Sorting;

export type ProductDto = {
  id?: string;
  title?: string;
  description?: string;
  imageFile?: string;
  guitarType?: GuitarType;
  article?: string;
  stringsCount?: StringsCount;
  price?: number;
  addedDate?: string;
};

export type User = {
  name: string;
  email: string;
};

export type UserAuth = User & { password: string };
export type UserRegister = UserAuth;
