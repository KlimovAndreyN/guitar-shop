import { Link } from 'react-router-dom';

type BreadcrumbItemProps = {
  title: string;
  route?: string;
}

const BreadcrumbItem = ({ title, route }: BreadcrumbItemProps): JSX.Element =>
(
  <li className="breadcrumbs__item">
    {route
      ? <Link className="link" to={route}>{title}</Link>
      : <a className="link">{title}</a>}
  </li>
);

export default BreadcrumbItem;
