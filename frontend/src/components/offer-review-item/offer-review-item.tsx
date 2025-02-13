import Rating from '../rating/rating';
import { Review } from '../../types/review';
import { DateFormat, getStringDate } from '../../utils/date';
import { ClassNamePrefix } from '../../const';

type OfferReviewItemProps = {
  review: Review;
}

function OfferReviewItem({ review }: OfferReviewItemProps): JSX.Element {
  const {
    date,
    user,
    comment,
    rating
  } = review;
  const {
    name,
    avatarUrl
  } = user;

  const reviewDate = getStringDate(date, DateFormat.DATE);
  const reviewDateString = getStringDate(date, DateFormat.MONTH_YEAR);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <Rating classNamePrefix={ClassNamePrefix.Reviews} rating={rating} />
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={reviewDate}>{reviewDateString}</time>
      </div>
    </li>
  );
}

export default OfferReviewItem;
