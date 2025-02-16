import { Helmet } from 'react-helmet-async';

import ProductForm from '../../components/product-form/product-form';
import { postProduct } from '../../store/action';
import { useAppDispatch } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import history from '../../history';
import { ProductDto } from '../../types/types';
import { AppRoute, PageTitle } from '../../const';

const emptyProduct: ProductDto = {
  title: '',
  description: '',
  article: ''
};

const AddProduct = (): JSX.Element => {
  const actionName = 'Новый товар';
  const dispatch = useAppDispatch();

  const handleFormCancel = () => {
    history.push(AppRoute.Catalog);
  };

  const handleFormSubmit = (productData: ProductDto) => {
    dispatch(postProduct(productData));
  };

  useScrollToTop();

  return (
    <main className="page-content">
      <Helmet>
        <title>{PageTitle.AddProduct}</title>
      </Helmet>
      <ProductForm
        actionName={actionName}
        product={emptyProduct}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
    </main>
  );
};

export default AddProduct;
