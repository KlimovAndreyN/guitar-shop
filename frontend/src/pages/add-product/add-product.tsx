import { Helmet } from 'react-helmet-async';

import BreadcrumbList from '../../components/breadcrumb-list/breadcrumb-list';
import ProductForm from '../../components/product-form/product-form';
import { postProduct } from '../../store/action';
import { useAppDispatch } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { CreateProductDto, GuitarType } from '../../types/backend';
import { PageTitle } from '../../const';

const emptyProduct: CreateProductDto & { id: string } = {
  id: '',
  article: '',
  description: '',
  guitarType: 'acoustic' as GuitarType, //!
  imageFile: '',
  price: 0,
  stringsCount: 5,
  title: '',
  addedDate: ''
};

const AddProduct = (): JSX.Element => {
  //!
  const actionName = 'Новый товар';
  const dispatch = useAppDispatch();

  const handleFormSubmit = (productData: CreateProductDto & { id: string }) => {
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
          <ProductForm product={emptyProduct} onSubmit={handleFormSubmit} />
        </div>
      </section>
    </main>
  );
};

export default AddProduct;
