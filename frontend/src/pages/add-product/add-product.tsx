import { Helmet } from 'react-helmet-async';

import ProductFormSection from '../../components/product-form-section/product-form-section';
import { postProduct } from '../../store/action';
import { useAppDispatch } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { ProductDto } from '../../types/types';
import { PageTitle } from '../../const';

const emptyProduct: ProductDto = {
  title: '',
  description: '',
  article: ''
};

const AddProduct = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (productData: ProductDto) => {
    dispatch(postProduct(productData));
  };

  useScrollToTop();

  return (
    <main className="page-content">
      <Helmet>
        <title>{PageTitle.AddProduct}</title>
      </Helmet>
      <ProductFormSection
        product={emptyProduct}
        onSubmit={handleFormSubmit}
      />
    </main>
  );
};

export default AddProduct;
