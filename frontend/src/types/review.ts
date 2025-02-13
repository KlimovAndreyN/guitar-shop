import { User } from '.';
import { OfferId } from './offer';

export type BaseReview = {
  comment: string;
  rating: number;
};

export type OfferBaseReview = { offerId: OfferId } & BaseReview;

export type Review =
  {
    id: string;
    date: string;
    user: User;
  }
  & BaseReview;

export type Reviews = Review[];
