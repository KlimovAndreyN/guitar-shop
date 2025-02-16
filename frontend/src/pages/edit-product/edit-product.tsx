import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Spinner from '../../components/spinner/spinner';
import ProductFormSection from '../../components/product-form-section/product-form-section';
import { editProduct, fetchProduct } from '../../store/action';
import { getIsProductLoading, getProduct } from '../../store/site-data/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { ProductDto } from '../../types/types';
import { PageTitle } from '../../const';

const EditProduct = (): JSX.Element | null => {
  useScrollToTop();

  const dispatch = useAppDispatch();
  const params = useParams();
  const isProductLoading = useAppSelector(getIsProductLoading);
  const product = useAppSelector(getProduct);

  useEffect(() => {
    const { id } = params;
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [params, dispatch]);

  if (isProductLoading) {
    return <Spinner />;
  }

  if (!product) {
    return null;
  }

  const handleFormSubmit = (productData: ProductDto) => {
    dispatch(editProduct(productData));
  };

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
