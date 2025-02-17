import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Spinner from '../../components/spinner/spinner';
import BreadcrumbList from '../../components/breadcrumb-list/breadcrumb-list';
import ProductTabs from '../../components/product-tabs/product-tabs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProduct } from '../../store/action';
import { getIsProductLoading, getProduct } from '../../store/site-data/selectors';
import { PageTitle } from '../../const';

const Product = (): JSX.Element | null => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isProductLoading = useAppSelector(getIsProductLoading);
  const product = useAppSelector(getProduct);

  useEffect(
    () => {
      const { id } = params;

      if (id) {
        dispatch(fetchProduct(id));
      }
    },
    [params, dispatch]
  );

  if (isProductLoading) {
    return <Spinner />;
  }

  if (!product) {
    return null;
  }

  const { title: productTitle, imagePath } = product;
  //! по ТЗ нет двух картинок разного размера - "/img/content/catalog-product-1.png" и "/img/content/catalog-product-1@2x.png 2x"
  const srcSet = '';
  const title = 'Товар';

  return (
    <main className="page-content">
      <Helmet>
        <title>{PageTitle.Product}</title>
      </Helmet>
      <div className="container">
        <h1 className="page-content__title title title--bigger">{title}</h1>
        <BreadcrumbList title={title} isFromShowProduct />
        <div className="product-container">
          <img className="product-container__img" src={imagePath} srcSet={srcSet} width="90" height="235" alt="" />
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{productTitle}</h2>
            <br />
            <br />
            <ProductTabs {...product} />
          </div>
        </div>
      </div>
    </main >
  );
};

export default Product;
