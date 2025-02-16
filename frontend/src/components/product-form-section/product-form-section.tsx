import BreadcrumbList from '../breadcrumb-list/breadcrumb-list';
import ProductForm from '../product-form/product-form';
import history from '../../history';
import { ProductDto } from '../../types/types';
import { AppRoute } from '../../const';

type ProductFormSectionProps = {
  product: ProductDto;
  onSubmit: (productData: ProductDto) => void;
};

const ProductFormSection = ({ product, onSubmit }: ProductFormSectionProps): JSX.Element => {
  const { id, title } = product;
  const isEditing = id !== undefined;
  const actionName = isEditing ? title : 'Новый товар';
  const prefixClassName = isEditing ? 'edit' : 'add';

  const handleFormCancel = () => {
    history.push(AppRoute.Catalog);
  };

  return (
    <section className={`${prefixClassName}-item`}>
      <div className="container">
        <h1 className={`${prefixClassName}-item__title`}>{actionName}</h1>
        <BreadcrumbList actionName={actionName} />
        <ProductForm
          isEditing={isEditing}
          prefixClassName={prefixClassName}
          actionName={actionName}
          product={product}
          onSubmit={onSubmit}
          onCancel={handleFormCancel}
        />
      </div>
    </section>
  );
};

export default ProductFormSection;
