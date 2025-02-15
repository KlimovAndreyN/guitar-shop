import BreadcrumbItem from '../breadcrumb-item/breadcrumb-item';
import { AppRoute } from '../../const';

type BreadcrumbListProps = {
  actionName?: string
}

const BreadcrumbList = ({ actionName }: BreadcrumbListProps): JSX.Element =>
(
  <ul className="breadcrumbs">
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

export default BreadcrumbList;
