import PlaceCardInfo from '../place-card-info/place-card-info';
import CityLink from '../city-link/city-link';
import { Offers } from '../../types/offer';
import { CityName } from '../../types';

type FavoriteItemProps = {
  cityName: CityName;
  offers: Offers;
}

function FavoriteItem({ cityName, offers }: FavoriteItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <CityLink cityName={cityName} />
        </div>
      </div>
      <div className="favorites__places">
        {
          offers.map((offer) => (
            <article key={offer.id} className="favorites__card place-card">
              <PlaceCardInfo
                additionalImageClassName="favorites__image-wrapper"
                imageWidth="150"
                imageHeight="110"
                additionalInfoClassName="favorites__card-info"
                offer={offer}
              />
            </article>
          ))
        }
      </div>
    </li>
  );
}

export default FavoriteItem;
