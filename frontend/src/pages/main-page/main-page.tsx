import classNames from 'classnames';
import Spinner from '../../components/spinner/spinner';
import Header from '../../components/header/header';
import Locations from '../../components/locations/locations';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import OffersMap from '../../components/offers-map/offers-map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeOfferSortingType } from '../../store/action';
import { addPluralEnding } from '../../utils/common';
import { getCityOffers, sortOffers } from '../../utils/offer';
import { ClassNamePrefix, OfferSortigType, RequestStatus } from '../../const';

function MainPage(): JSX.Element {
  const offersLoadingRequestStatus = useAppSelector((state) => state.offersLoadingRequestStatus);
  const offers = useAppSelector((state) => state.offers);
  const currentCityName = useAppSelector((state) => state.cityName);
  const currentOfferSortType = useAppSelector((state) => state.offerSoritngType);
  const dispatch = useAppDispatch();

  if (offersLoadingRequestStatus === RequestStatus.Loading) {
    return (
      <Spinner />
    );
  }

  const cityOffers = sortOffers(getCityOffers(currentCityName, offers), currentOfferSortType);

  const cityOffersCount = cityOffers.length;
  const isCityOffersEmpty: boolean = !cityOffersCount;
  const mainClassName = classNames(
    'page__main page__main--index',
    { 'page__main--index-empty': isCityOffersEmpty }
  );
  const divClassName = classNames(
    'cities__places-container container',
    { 'cities__places-container--empty': isCityOffersEmpty }
  );
  const sectionClassName = classNames(
    { 'cities__no-places': isCityOffersEmpty },
    { 'cities__places places': !isCityOffersEmpty }
  );

  const handleSortingTypeChange = (sortingType: OfferSortigType) => {
    dispatch(changeOfferSortingType(sortingType));
  };

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={mainClassName}>
        <Locations currentCityName={currentCityName} />
        <div className="cities">
          <div className={divClassName}>
            <section className={sectionClassName}>
              {
                isCityOffersEmpty
                  ?
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in {currentCityName}</p>
                  </div>
                  :
                  <>
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{cityOffersCount} {addPluralEnding('place', cityOffersCount)} to stay in {currentCityName}</b>
                    <PlacesSorting
                      currentOfferSortType={currentOfferSortType}
                      onSortingTypeChange={handleSortingTypeChange}
                    />
                    <PlaceCardList offers={cityOffers} />
                  </>
              }
            </section>
            <div className="cities__right-section">
              {
                isCityOffersEmpty
                  ?
                  null
                  :
                  <OffersMap
                    classNamePrefix={ClassNamePrefix.Cities}
                    // для координат города можно взять коодинаты из первого предложения
                    startLocation={cityOffers[0].city.location}
                    offers={cityOffers}

                  />
              }
            </div>
          </div>
        </div>
      </main>
    </div >
  );
}

export default MainPage;
