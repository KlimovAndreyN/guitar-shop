import { useEffect, useState } from 'react';

import Spinner from '../spinner/spinner';
import ProductItem from '../product-item/product-item';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { getIsProductsLoading, getProductsWithPagination } from '../../store/site-data/selectors';
import { deleteProduct, fetchProducts } from '../../store/action';
import { Product } from '../../types/backend';

const ProductList = (): JSX.Element => {
  useScrollToTop();

  const dispatch = useAppDispatch();
  const [isDeleteAction, setIsDeleteAction] = useState(false);
  const page = 1;

  const isProductsLoading = useAppSelector(getIsProductsLoading);
  const productsWithPagination = useAppSelector(getProductsWithPagination);

  const products: Product[] = productsWithPagination?.entities || [];
  const isEmpty = products.length === 0;

  useEffect(
    () => {
      dispatch(fetchProducts());
      setIsDeleteAction(false);
    },
    [isDeleteAction, page, dispatch]
  );

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id));
    setIsDeleteAction(true);
  };

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
                  <ProductItem key={product.id} {...product} onDeleteProduct={handleDeleteProduct} />
                )
              )
            }
          </ul>
      }
    </div>
  );
};

export default ProductList;
