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
import { editProduct } from '../../store/action';
import { useAppDispatch } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { CreateProductDto, GuitarType } from '../../types/backend';
import { PageTitle } from '../../const';


const product: CreateProductDto & { id: string } = {
  id: '',
  article: '',
  description: '',
  guitarType: 'acoustic' as GuitarType, //!
  imageFile: '',
  price: 0,
  stringsCount: 5,
  title: '',
  addedDate: ''
};

const EditProduct = (): JSX.Element | null => {
  //!
  const actionName = 'СURT Z30 Plus';
  const dispatch = useAppDispatch();
  /*
  {
  const params = useParams();
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
*/
  const handleFormSubmit = (productData: CreateProductDto & { id: string }) => {
    dispatch(editProduct(productData));
  };
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
          <ProductForm product={product} onSubmit={handleFormSubmit} />
        </div>
      </section>
    </main>
  );
};

export default EditProduct;
