import { useEffect } from 'react';

import Spinner from '../spinner/spinner';
import ProductItem from '../product-item/product-item';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { getIsProductsLoading, getProductsWithPagination } from '../../store/site-data/selectors';
import { fetchProducts } from '../../store/action';
import { Product } from '../../types/backend';

const ProductList = (): JSX.Element => {
  useScrollToTop();

  const dispatch = useAppDispatch();
  const page = 1;

  useEffect(
    () => {
      dispatch(fetchProducts());
    },
    [page, dispatch]
  );

  const isProductsLoading = useAppSelector(getIsProductsLoading);
  const productsWithPagination = useAppSelector(getProductsWithPagination);

  const products: Product[] = productsWithPagination?.entities || [];
  const isEmpty = products.length === 0;

  if (isProductsLoading) {
    return <Spinner />;
  }

  return (
    <div className="catalog-cards">
      {
        isEmpty
          ?
          <p>Товары не найдены</p>
          :
          <ul className="catalog-cards__list">
            {
              products.map(
                (product) => (
                  <ProductItem key={product.id} {...product} />
                )
              )
            }
          </ul>
      }
    </div>
  );
};

export default ProductList;
