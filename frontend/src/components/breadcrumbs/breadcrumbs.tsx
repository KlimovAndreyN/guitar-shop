import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

type BreadcrumbsProps = {
  name?: string
}

const Breadcrumbs = ({ name }: BreadcrumbsProps): JSX.Element =>
(
  <ul className="breadcrumbs">
    <li className="breadcrumbs__item">
      <Link className="link" to={AppRoute.Root}>Вход</Link>
    </li>
    {
      name
        ?
        <>
          <li className="breadcrumbs__item">
            <Link className="link" to={AppRoute.Catalog}>Товары</Link>
          </li>
          <li className="breadcrumbs__item">
            <a className="link">{name}</a>
          </li>
        </>
        :
        <li className="breadcrumbs__item">
          <a className="link">Товары</a>
        </li>
    }
  </ul>
);

export default Breadcrumbs;
