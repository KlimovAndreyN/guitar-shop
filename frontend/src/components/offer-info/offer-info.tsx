import OfferGallery from '../offer-gallery/offer-gallery';
import OfferInside from '../offer-inside/offer-inside';
import Mark from '../mark/mark';
import BookmarkButton from '../bookmark-button/bookmark-button';
import Rating from '../rating/rating';
import OfferHost from '../offer-host/offer-host';
import OfferReviews from '../offer-reviews/offer-reviews';
import NearPlaces from '../near-places/near-places';
import Price from '../price/price';
import OfferFeatures from '../offer-features/offer-features';
import OffersMap from '../offers-map/offers-map';
import { useAppSelector } from '../../hooks';
import { Review } from '../../types/review';
import { compareStringDate } from '../../utils/date';
import { ClassNamePrefix, OfferComponentsCount } from '../../const';

function OfferInfo(): JSX.Element {
  const detailOffer = useAppSelector((state) => state.detailOffer);
  const nearOffers = useAppSelector((state) => state.offerNearOffers);
  const reviews = useAppSelector((state) => state.offerReviews);

  const offers = nearOffers.slice(0, OfferComponentsCount.NEAR_OFFERS);

  const offerReviews = [...reviews]
    .sort((firstReview: Review, secondReview: Review) => compareStringDate(firstReview.date, secondReview.date))
    .slice(0, OfferComponentsCount.REVIEWS);

  const {
    id,
    title,
    type,
    price,
    city,
    isFavorite,
    isPremium,
    rating,
    description,
    bedrooms,
    goods,
    host,
    images,
    maxAdults
  } = detailOffer;
  const classNamePrefix: ClassNamePrefix = ClassNamePrefix.Offer;

  return (

    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGallery images={images.slice(0, OfferComponentsCount.IMAGES)} />
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium ? <Mark className="offer__mark" /> : null}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {title}
              </h1>
              <BookmarkButton
                offerId={id}
                classNamePrefix={classNamePrefix}
                isActive={isFavorite}
                isBigButton
              />
            </div>
            <Rating classNamePrefix={classNamePrefix} rating={rating} />
            <OfferFeatures offerType={type} bedrooms={bedrooms} maxAdults={maxAdults} />
            <Price classNamePrefix={classNamePrefix} price={price} />
            <OfferInside goods={goods} />
            <OfferHost host={host} description={description} />
            <OfferReviews reviewsCount={reviews.length} reviews={offerReviews} />
          </div>
        </div>
        <OffersMap
          classNamePrefix={classNamePrefix}
          startLocation={city.location}
          offers={offers}
          activeDetailOffer={detailOffer}
        />
      </section>
      <div className="container">
        <NearPlaces offers={offers} />
      </div>
    </main>
  );
}

export default OfferInfo;
