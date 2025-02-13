import { ClassNamePrefix, RATING_STAR_WIDTH } from '../../const';

type RatingProps = {
  classNamePrefix: ClassNamePrefix;
  rating: number;
}

function Rating({ classNamePrefix, rating }: RatingProps): JSX.Element {
  const ratingClassName = `${classNamePrefix}__rating rating`;
  const starsClassName = `${classNamePrefix}__stars rating__stars`;

  return (
    <div className={ratingClassName}>
      <div className={starsClassName}>
        <span style={{ width: `${Math.round(rating) * RATING_STAR_WIDTH}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {(classNamePrefix === ClassNamePrefix.Offer) ? <span className="offer__rating-value rating__value">{rating}</span> : null}
    </div>
  );
}

export default Rating;
