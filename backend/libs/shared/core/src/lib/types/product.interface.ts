import { GuitarType } from './guitar-type.enum';
import { StringsCount } from './strings-count.type';

export interface Product {
  id?: string;
  title: string;
  description: string;
  addedDate?: Date;
  imagePath: string;
  guitarType: GuitarType;
  article: string;
  stringsCount: StringsCount;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
