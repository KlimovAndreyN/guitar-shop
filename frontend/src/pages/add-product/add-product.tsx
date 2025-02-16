/*
import { NewOffer } from '../../types/types';
import { CITIES, CityLocation } from '../../const';
import OfferForm from '../../components/offer-form/offer-form';
import { useAppDispatch } from '../../hooks';
import { postOffer } from '../../store/action';

const emptyOffer: NewOffer = {
  title: '',
  description: '',
  city: { name: CITIES[0], location: CityLocation[CITIES[0]] },
  previewImage: '',
  isPremium: false,
  type: 'apartment',
  bedrooms: 1,
  maxAdults: 1,
  price: 0,
  goods: [],
  location: CityLocation[CITIES[0]],
  images: new Array(6).fill('')
};
*/

import { Helmet } from 'react-helmet-async';

import BreadcrumbList from '../../components/breadcrumb-list/breadcrumb-list';
import ProductForm from '../../components/product-form/product-form';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { PageTitle } from '../../const';

const AddProduct = (): JSX.Element => {
  const actionName = 'Новый товар';
  /*
  {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (offerData: NewOffer) => {
    dispatch(postOffer(offerData));
  };

  return (
    <main className="page__main">
      <div className="container">
        <section>
          <h1>Add new offer</h1>
          <OfferForm offer={emptyOffer} onSubmit={handleFormSubmit} />
        </section>
      </div>
    </main>
  );
*/
  useScrollToTop();

  return (
    <main className="page-content">
      <Helmet>
        <title>{PageTitle.AddProduct}</title>
      </Helmet>
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">{actionName}</h1>
          <BreadcrumbList actionName={actionName} />
          <ProductForm />
        </div>
      </section>
    </main>
  );
};

export default AddProduct;
