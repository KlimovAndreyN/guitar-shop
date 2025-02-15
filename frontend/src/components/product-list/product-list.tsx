import { useEffect, useState } from 'react';

import type { SortName } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSorting } from '../../store/site-process/site-process';
import Card from '../card/card';
import Map from '../map/map';
import SortingList from '../sorting-list/sorting-list';
import Spinner from '../spinner/spinner';
import { getSorting } from '../../store/site-process/selectors';
import { getIsProductsLoading, getProductsWithPagination, selectOffers } from '../../store/site-data/selectors';
import CardListEmpty from '../card-list-empty/card-list-empty';
import { fetchProcuts } from '../../store/action';

const ProductList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const page = 1;

  useEffect(() => {
    dispatch(fetchProcuts());
  }, [page, dispatch]);

  const activeSorting = useAppSelector(getSorting);
  const isProductsLoading = useAppSelector(getIsProductsLoading);
  const productsWithPagination = useAppSelector(getProductsWithPagination);
  //!
  // eslint-disable-next-line no-console
  console.log(productsWithPagination);

  /*
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  const isEmpty = offers.length === 0;

  const handleCardMouseEnter = (id: string) => {
    setActiveOffer(id);
  };

  const handleCardMouseLeave = () => {
    setActiveOffer(null);
  };

  const onSortingChange = (name: SortName) => {
    dispatch(setSorting(name));
  };

  if (isProductsLoading) {
    return <Spinner />;
  }
*/
  return (<p>1111111111</p>
  );
};
/*
    <div className={`cities__places-container container${isEmpty ? ' cities__places-container page__main--index-empty' : ''}`}>
      {isEmpty ? <CardListEmpty city={activeCity.name} /> : (
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {activeCity.name}</b>
          <SortingList onChange={onSortingChange} activeSorting={activeSorting} />
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (
              <Card
                key={offer.id}
                {...offer}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              />
            ))}
          </div>
        </section>)}
      <div className="cities__right-section">
        {!isEmpty && <Map locations={offers.map(({ id, location }) => ({ id, ...location }))} city={activeCity} activeOffer={activeOffer} />}
      </div>
    </div>
*/
export default ProductList;
