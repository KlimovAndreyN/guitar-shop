import PlaceCardInfo from '../place-card-info/place-card-info';
import { useAppDispatch } from '../../hooks';
import { changeActiveOfferId } from '../../store/action';
import { Offer } from '../../types/offer';

type PlaceCardProps = {
  offer: Offer;
}

function PlaceCard({ offer }: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => {
        dispatch(changeActiveOfferId(offer.id));
      }}
      onMouseLeave={() => {
        dispatch(changeActiveOfferId(null));
      }}
    >
      <PlaceCardInfo
        additionalImageClassName="cities__image-wrapper"
        imageWidth="260"
        imageHeight="200"
        offer={offer}
      />
    </article>
  );
}

export default PlaceCard;
