import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoriteItem from '../../components/favorite-item/favorite-item';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { getOffersByCityName } from '../../utils/offer';
import { PageTitle } from '../../const';

function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  const isOffersEmpty: boolean = !favoriteOffers.length;
  const divPageClassName = classNames('page', { 'page--favorites-empty': isOffersEmpty });
  const mainClassName = classNames('page__main page__main--favorites', { 'page__main--favorites-empty': isOffersEmpty });
  const sectionClassName = classNames('favorites', { 'favorites--empty': isOffersEmpty });

  return (
    <div className={divPageClassName} >
      <Helmet>
        <title>{isOffersEmpty ? PageTitle.EmptyFavorites : PageTitle.Favorites}</title>
      </Helmet>
      <Header favoriteOfferCount={favoriteOffers.length} />

      <main className={mainClassName}>
        <div className="page__favorites-container container">
          <section className={sectionClassName}>
            <h1 className="visually-hidden">{isOffersEmpty ? 'Favorites (empty)' : 'Saved listing'} </h1>
            {
              isOffersEmpty
                ?
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
                :
                <ul className="favorites__list">
                  {
                    getOffersByCityName(favoriteOffers)
                      .map(({ cityName, offers: cityOffers }) => (
                        <FavoriteItem
                          key={cityName}
                          cityName={cityName}
                          offers={cityOffers}
                        />
                      ))
                  }
                </ul>
            }
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
