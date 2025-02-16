import { Helmet } from 'react-helmet-async';

import BreadcrumbList from '../../components/breadcrumb-list/breadcrumb-list';
import ProductForm from '../../components/product-form/product-form';
import { postProduct } from '../../store/action';
import { useAppDispatch } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import history from '../../history';
import { GuitarType } from '../../types/backend';
import { ProductDto } from '../../types/types';
import { AppRoute, PageTitle } from '../../const';

const emptyProduct: ProductDto = {
  id: undefined,
  article: '',
  description: '',
  guitarType: 'acoustic' as GuitarType, //!
  imageFile: '',
  price: 0,
  stringsCount: 6,//!
  title: '',
  addedDate: ''
};

const AddProduct = (): JSX.Element => {
  //!
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
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">{actionName}</h1>
          <BreadcrumbList actionName={actionName} />
          <ProductForm product={emptyProduct} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
        </div>
      </section>
    </main>
  );
};

export default AddProduct;
