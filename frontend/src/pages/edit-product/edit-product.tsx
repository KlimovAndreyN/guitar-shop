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

import ProductFormSection from '../../components/product-form-section/product-form-section';
import { editProduct } from '../../store/action';
import { useAppDispatch } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { GuitarType } from '../../types/backend';
import { ProductDto } from '../../types/types';
import { PageTitle } from '../../const';

const product: ProductDto = {
  id: 'ProductDtoId',
  article: '',
  description: '',
  guitarType: 'acoustic' as GuitarType, //!
  imageFile: '',
  price: 0,
  stringsCount: 6,
  title: 'title',
  addedDate: ''
};

const EditProduct = (): JSX.Element | null => {
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

  const handleFormSubmit = (productData: ProductDto) => {
    dispatch(editProduct(productData));
  };

  useScrollToTop();

  return (
    <main className="page-content">
      <Helmet>
        <title>{PageTitle.EditProduct}</title>
      </Helmet>
      <ProductFormSection
        product={product}
        onSubmit={handleFormSubmit}
      />
    </main>
  );
};

export default EditProduct;
