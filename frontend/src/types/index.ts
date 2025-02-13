import { CITIES_NAMES } from '../const';

export type Token = string;

export type AppRouteProps = {
  children: JSX.Element;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityName = typeof CITIES_NAMES[number];

export type City = {
  name: CityName;
  location: Location;
};

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type AuthData = {
  login: string;
  password: string;
};

export type UserData =
  User & {
    email: string;
    token: string;
  };
