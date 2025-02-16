import classNames from 'classnames';

import BreadcrumbItem from '../breadcrumb-item/breadcrumb-item';
import { AppRoute } from '../../const';

type BreadcrumbListProps = {
  title?: string;
  isFromShowProduct?: boolean;
}

const BreadcrumbList = ({ title, isFromShowProduct: isFromProduct = false }: BreadcrumbListProps): JSX.Element => {
  const className = classNames('breadcrumbs', { 'page-content__breadcrumbs': isFromProduct });

  return (
    <ul className={className}>
      <BreadcrumbItem title='Вход' route={AppRoute.Root} />
      {
        title
          ?
          <>
            <BreadcrumbItem title='Товары' route={AppRoute.Catalog} />
            <BreadcrumbItem title={title} />
          </>
          :
          <BreadcrumbItem title='Товары' />
      }
    </ul>
  );
};

export default BreadcrumbList;
