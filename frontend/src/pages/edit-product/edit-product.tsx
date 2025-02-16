/*
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Spinner from '../../components/spinner/spinner';
import OfferForm from '../../components/offer-form/offer-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { editOffer, fetchOffer } from '../../store/action';
import { getIsOfferLoading, getOffer } from '../../store/site-data/selectors';
import { Offer } from '../../types/types';
*/

import { Helmet } from 'react-helmet-async';

import BreadcrumbList from '../../components/breadcrumb-list/breadcrumb-list';
import ProductForm from '../../components/product-form/product-form';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { PageTitle } from '../../const';

const EditProduct = (): JSX.Element | null => {
  const actionName = 'СURT Z30 Plus';
  /*
  {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isOfferLoading = useAppSelector(getIsOfferLoading);
  const offer = useAppSelector(getOffer);

  useEffect(() => {
    const { id } = params;
    if (id) {
      dispatch(fetchOffer(id));
    }
  }, [params, dispatch]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return null;
  }

  const handleFormSubmit = (offerData: Offer) => {
    dispatch(editOffer(offerData));
  };

  return (
    <main className="page__main">
      <div className="container">
        <section>
          <h1>Edit offer</h1>
          <OfferForm offer={offer} onSubmit={handleFormSubmit} />
        </section>
      </div>
    </main>
  );
  */
  useScrollToTop();

  return (
    <main className="page-content">
      <Helmet>
        <title>{PageTitle.EditProduct}</title>
      </Helmet>
      <section className="edit-item">
        <div className="container">
          <h1 className="edit-item__title">{actionName}</h1>
          <BreadcrumbList actionName={actionName} />
          <ProductForm />
        </div>
      </section>
    </main>
  );
};

export default EditProduct;
