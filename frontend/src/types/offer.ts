import { City, CityName, Location, User } from '.';

export type OfferId = string | null | undefined;

export type BaseOffer = {
  id: OfferId;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type Offer = BaseOffer & { previewImage: string };

export type Offers = Offer[];

export type DetailOffer =
  BaseOffer
  & {
    description: string;
    bedrooms: number;
    goods: string[];
    host: User;
    images: string[];
    maxAdults: number;
  };

export type OffersByCityName = { cityName: CityName; offers: Offers };

export type OfferFavorite = { id: OfferId; status: boolean };
