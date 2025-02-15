import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Spinner from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProduct } from '../../store/action';
import { getIsProductLoading, getProduct } from '../../store/site-data/selectors';

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

  return (
    <p>product.id - {product.id}</p>
  );
};

export default Product;
