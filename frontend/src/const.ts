import { CityName } from './types';
import { DetailOffer } from './types/offer';

enum PageTitle {
  Root = '6 cities',
  Favorites = `${Root}: favorites`,
  EmptyFavorites = `${Favorites} empty`,
  Login = `${Root}: authorization`,
  NotFound = `${Root}: 404`,
  Offer = `${Root}: offer`
}

const APIService = {
  URL: 'https://16.design.htmlacademy.pro/six-cities',
  TIMEOUT: 5000
} as const;

const Password = {
  CHECK_REGEXP: /[a-zA-Zа-яА-Я]\d|\d[a-zA-Zа-яА-Я]/,
  WARNING_MESSGAGE: 'The password must consist of at least one letter and one number!'
} as const;

enum APIRoute {
  Offers = '/offers',
  Nearby = '/nearby',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

const CITIES_NAMES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
const DEFAULT_CITY_NAME: CityName = CITIES_NAMES[0];

const OFFER_BASE_ROUTE = '/offer/';

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = `${OFFER_BASE_ROUTE}:id`
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed'
}

enum OfferSortigType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

const DEFALUT_OFFER_SORTING_TYPE = OfferSortigType.Popular;

enum ClassNamePrefix {
  Offer = 'offer',
  PlaceCard = 'place-card',
  Reviews = 'reviews',
  Cities = 'cities'
}

const BookmarkButtonIconSize = {
  SMALL: { width: 18, height: 19 },
  BIG: { width: 31, height: 33 },
} as const;

enum OfferFeatureType {
  Entire = 'entire',
  Bedrooms = 'bedrooms',
  Adults = 'adults'
}

const RATING_STAR_WIDTH = 20;

const EMPTY_USER = {
  avatarUrl: '',
  email: '',
  isPro: false,
  name: '',
  token: ''
} as const;

const EMPTY_DETAIL_OFFER: DetailOffer = {
  id: null,
  title: '',
  type: 'room',
  price: 0,
  city: {
    name: DEFAULT_CITY_NAME,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    }
  },
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  },
  isFavorite: false,
  isPremium: false,
  rating: 0,
  description: '',
  bedrooms: 0,
  goods: [] as string[],
  host: {
    name: '',
    avatarUrl: '',
    isPro: false,
  },
  images: [] as string[],
  maxAdults: 0
} as const;

const OfferComponentsCount = {
  IMAGES: 6,
  NEAR_OFFERS: 3,
  REVIEWS: 10
} as const;

const ReviewRating = {
  HINTS: ['perfect', 'good', 'not bad', 'badly', 'terribly'],
  DEFAULT: 0,
  MIN: 1
} as const;

const ReviewTextLength = {
  MIN: 50,
  MAX: 300
} as const;

const Leaflet = {
  URL_TEMPLATE: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  OPTIONS:
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }
} as const;

const UrlMarker = {
  DEFAULT: '/img/pin.svg',
  CURRENT: '/img/pin-active.svg'
} as const;

const IconMarkerSize = {
  WIDTH: 27,
  HEIGHT: 39
} as const;

const IconAnchorSize = {
  WIDTH: IconMarkerSize.WIDTH / 2,
  HEIGHT: IconMarkerSize.HEIGHT
} as const;

enum ActionName {
  LoadOffers = 'data/loadOffers',
  ChangeDetailOffer = 'data/changeDetailOffer',
  LoadFavoriteOffers = 'data/loadFavoriteOffers',
  LoadDetailOffer = 'data/loadDetailOffer',
  LoadOfferNearOffers = 'data/loadOfferNearOffers',
  LoadOfferReviews = 'data/loadOfferReviews',
  LoadOfferReview = 'data/loadOfferReview',
  FetchOffers = 'data/fetchOffers',
  FetchFavoriteOffers = 'data/loadfetchOffers',
  FetchDetailOffer = 'data/fetchDetailOffer',
  FetchOfferNearOffers = 'data/fetchOfferNearOffers',
  FetchOfferReviews = 'data/fetchOfferReviews',
  PostOfferReview = 'data/postOfferReview',
  PostOfferFavorite = 'data/postOfferFavorite',
  Login = 'user/login',
  Logout = 'user/logout',
  CheckAuth = 'user/checkAuth',
  SetOffersLoadingRequestStatus = 'main/SetOffersLoadingRequestStatus',
  SetReviewPostingRequestStatus = 'main/SetReviewPostingRequestStatus',
  ChangeCityName = 'main/changeCityName',
  ChangeOfferSortingType = 'main/changeOfferSortingType',
  ChangeActiveOfferId = 'main/changeActiveOfferId',
  RequireAuthorization = 'user/requireAuthorization',
  SetUser = 'user/setUser'
}

export {
  PageTitle,
  APIService,
  Password,
  APIRoute,
  AUTH_TOKEN_KEY_NAME,
  CITIES_NAMES,
  DEFAULT_CITY_NAME,
  OFFER_BASE_ROUTE,
  AppRoute,
  AuthorizationStatus,
  RequestStatus,
  OfferSortigType,
  DEFALUT_OFFER_SORTING_TYPE,
  ClassNamePrefix,
  BookmarkButtonIconSize,
  OfferFeatureType,
  RATING_STAR_WIDTH,
  EMPTY_USER,
  EMPTY_DETAIL_OFFER,
  OfferComponentsCount,
  ReviewRating,
  ReviewTextLength,
  Leaflet,
  UrlMarker,
  IconMarkerSize,
  IconAnchorSize,
  ActionName
};
