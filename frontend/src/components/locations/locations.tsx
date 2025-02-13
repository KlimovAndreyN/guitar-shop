import { CityName } from '../../types';
import { CITIES_NAMES } from '../../const';
import CityLink from '../city-link/city-link';

type LocationsProps = {
  currentCityName: CityName;
}

function Locations({ currentCityName }: LocationsProps): JSX.Element {
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              CITIES_NAMES.map((cityName) => (
                <li className="locations__item" key={cityName} >
                  <CityLink cityName={cityName} isTab isTabActive={cityName === currentCityName} />
                </li>
              ))
            }
          </ul>
        </section>
      </div>
    </>
  );
}

export default Locations;
