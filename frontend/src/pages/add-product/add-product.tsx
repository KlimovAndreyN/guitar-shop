import { Helmet } from 'react-helmet-async';

import ProductFormSection from '../../components/product-form-section/product-form-section';
import { postProduct } from '../../store/action';
import { useAppDispatch } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { DetailProduct } from '../../types/backend';
import { ProductDto } from '../../types/types';
import { GuitarType, PageTitle, STRINGS_COUNT_VALUES } from '../../const';

const emptyProduct: DetailProduct = {
  title: '',
  description: '',
  article: '',
  imagePath: '',
  addedDate: '',
  guitarType: GuitarType.Acoustic,
  price: 0,
  id: '',
  stringsCount: STRINGS_COUNT_VALUES[0]
};

const AddProduct = (): JSX.Element => {
  useScrollToTop();

  const dispatch = useAppDispatch();

  const handleFormSubmit = (productData: ProductDto) => {
    dispatch(postProduct(productData));
  };

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
