import OfferReviewItem from '../offer-review-item/offer-review-item';
import OfferReviewsForm from '../offer-reviews-form/offer-reviews-form';
import { useAppSelector } from '../../hooks';
import { Reviews } from '../../types/review';
import { AuthorizationStatus } from '../../const';

type OfferReviewsProps = {
  reviewsCount: number;
  reviews: Reviews;
}

function OfferReviews({ reviewsCount, reviews }: OfferReviewsProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>
      {
        !reviewsCount
          ?
          null
          :
          <ul className="reviews__list">
            {
              reviews.map((review) => (
                <OfferReviewItem key={review.id} review={review} />
              ))
            }
          </ul>
      }
      {(authorizationStatus === AuthorizationStatus.Auth) ? <OfferReviewsForm /> : null}
    </section>
  );
}

export default OfferReviews;
