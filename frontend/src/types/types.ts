import { Sorting } from '../const';

export type SortName = keyof typeof Sorting;

export type User = {
  name: string;
  email: string;
};

//!
export type NewOffer = {
  title: string;
  description: string;
  previewImage: string;
  isPremium: boolean;
  bedrooms: number;
  maxAdults: number;
  price: number;
  images: string[];
};

export type UserAuth = User & { password: string };
export type UserRegister = UserAuth;
