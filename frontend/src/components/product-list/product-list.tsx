import { useEffect, useState } from 'react';

import type { SortName } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSorting } from '../../store/site-process/site-process';
import Card from '../card/card';
import SortingList from '../sorting-list/sorting-list';
import Spinner from '../spinner/spinner';
import { getSorting } from '../../store/site-process/selectors';
import { getIsProductsLoading, getProductsWithPagination, selectOffers } from '../../store/site-data/selectors';
import { fetchProcuts } from '../../store/action';

const ProductList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const page = 1;

  useEffect(() => {
    dispatch(fetchProcuts());
  }, [page, dispatch]);

  //const activeSorting = useAppSelector(getSorting);
  const isProductsLoading = useAppSelector(getIsProductsLoading);
  const productsWithPagination = useAppSelector(getProductsWithPagination);
  //!
  // eslint-disable-next-line no-console
  console.log(productsWithPagination);
  //! productsWithPagination == null ? => Empty и Error Toast ?
  //! productsWithPagination.entities = [] ? => Empty ?

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
*/

  if (isProductsLoading) {
    return <Spinner />;
  }

  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        <li className="catalog-item">
          <div className="catalog-item__data">
            <img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" />
            <div className="catalog-item__data-wrapper">
              <a className="link" href="./product.html"><p className="catalog-item__data-title">ЭлектроГитара Честер bass</p></a>
              <br />
              <p className="catalog-item__data-date">Дата добавления 19.09.2022</p>
              <p className="catalog-item__data-price">17 500 ₽</p>
            </div>
          </div>
          <div className="catalog-item__buttons"><a className="button button--small button--black-border" href="edit-item.html" aria-label="Редактировать товар">Редактировать</a>
            <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
          </div>
        </li>
        <li className="catalog-item">
          <div className="catalog-item__data">
            <img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" />
            <div className="catalog-item__data-wrapper">
              <a className="link" href="./product.html"><p className="catalog-item__data-title">ЭлектроГитара Честер bass</p></a>
              <br />
              <p className="catalog-item__data-date">Дата добавления 19.09.2022</p>
              <p className="catalog-item__data-price">17 500 ₽</p>
            </div>
          </div>
          <div className="catalog-item__buttons"><a className="button button--small button--black-border" href="edit-item.html" aria-label="Редактировать товар">Редактировать</a>
            <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
          </div>
        </li>
        <li className="catalog-item">
          <div className="catalog-item__data">
            <img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" />
            <div className="catalog-item__data-wrapper">
              <a className="link" href="./product.html"><p className="catalog-item__data-title">ЭлектроГитара Честер bass</p></a>
              <br />
              <p className="catalog-item__data-date">Дата добавления 19.09.2022</p>
              <p className="catalog-item__data-price">17 500 ₽</p>
            </div>
          </div>
          <div className="catalog-item__buttons"><a className="button button--small button--black-border" href="edit-item.html" aria-label="Редактировать товар">Редактировать</a>
            <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
          </div>
        </li>
        <li className="catalog-item">
          <div className="catalog-item__data">
            <img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" />
            <div className="catalog-item__data-wrapper">
              <a className="link" href="./product.html"><p className="catalog-item__data-title">ЭлектроГитара Честер bass</p></a>
              <br />
              <p className="catalog-item__data-date">Дата добавления 19.09.2022</p>
              <p className="catalog-item__data-price">17 500 ₽</p>
            </div>
          </div>
          <div className="catalog-item__buttons"><a className="button button--small button--black-border" href="edit-item.html" aria-label="Редактировать товар">Редактировать</a>
            <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
          </div>
        </li>
        <li className="catalog-item">
          <div className="catalog-item__data">
            <img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" />
            <div className="catalog-item__data-wrapper">
              <a className="link" href="./product.html"><p className="catalog-item__data-title">ЭлектроГитара Честер bass</p></a>
              <br />
              <p className="catalog-item__data-date">Дата добавления 19.09.2022</p>
              <p className="catalog-item__data-price">17 500 ₽</p>
            </div>
          </div>
          <div className="catalog-item__buttons"><a className="button button--small button--black-border" href="edit-item.html" aria-label="Редактировать товар">Редактировать</a>
            <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
          </div>
        </li>
        <li className="catalog-item">
          <div className="catalog-item__data">
            <img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" />
            <div className="catalog-item__data-wrapper">
              <a className="link" href="./product.html"><p className="catalog-item__data-title">ЭлектроГитара Честер bass</p></a>
              <br />
              <p className="catalog-item__data-date">Дата добавления 19.09.2022</p>
              <p className="catalog-item__data-price">17 500 ₽</p>
            </div>
          </div>
          <div className="catalog-item__buttons"><a className="button button--small button--black-border" href="edit-item.html" aria-label="Редактировать товар">Редактировать</a>
            <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
          </div>
        </li>
        <li className="catalog-item">
          <div className="catalog-item__data">
            <img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" />
            <div className="catalog-item__data-wrapper">
              <a className="link" href="./product.html"><p className="catalog-item__data-title">ЭлектроГитара Честер bass</p></a>
              <br />
              <p className="catalog-item__data-date">Дата добавления 19.09.2022</p>
              <p className="catalog-item__data-price">17 500 ₽</p>
            </div>
          </div>
          <div className="catalog-item__buttons"><a className="button button--small button--black-border" href="edit-item.html" aria-label="Редактировать товар">Редактировать</a>
            <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
          </div>
        </li>
      </ul>
    </div>
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
    </div>
*/
export default ProductList;
