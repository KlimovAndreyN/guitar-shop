import BreadcrumbItem from '../breadcrumb-item/breadcrumb-item';
import { AppRoute } from '../../const';
import classNames from 'classnames';

type BreadcrumbListProps = {
  actionName?: string;
  isFromProduct?: boolean;
}

const BreadcrumbList = ({ actionName, isFromProduct = false }: BreadcrumbListProps): JSX.Element => {
  const className = classNames('breadcrumbs', { 'page-content__breadcrumbs': isFromProduct });

  return (
    <ul className={className}>
      <BreadcrumbItem title='Вход' route={AppRoute.Root} />
      {
        actionName
          ?
          <>
            <BreadcrumbItem title='Товары' route={AppRoute.Catalog} />
            <BreadcrumbItem title={actionName} />
          </>
          :
          <BreadcrumbItem title='Товары' />
      }
    </ul>
  );
};

export default BreadcrumbList;
