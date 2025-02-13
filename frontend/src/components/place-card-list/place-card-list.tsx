import PlaceCard from '../place-card/place-card';
import { Offers } from '../../types/offer';

type PlaceCardListProps = {
  offers: Offers;
}

function PlaceCardList(props: PlaceCardListProps): JSX.Element {
  const { offers } = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
          />
        ))
      }
    </div>
  );
}

export default PlaceCardList;
