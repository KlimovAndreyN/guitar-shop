import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { changeCityName } from '../../store/action';
import { CityName } from '../../types';
import { AppRoute } from '../../const';

type CityLinkProps = {
  cityName: CityName;
  isTab?: boolean;
  isTabActive?: boolean;
}

function CityLink({ cityName, isTab, isTabActive }: CityLinkProps): JSX.Element {
  const dispatch = useAppDispatch();

  const className = classNames(
    'locations__item-link',
    { 'tabs__item': isTab },
    { 'tabs__item--active': isTabActive }
  );

  return (
    <Link
      to={AppRoute.Main}
      className={className}
      onClick={
        () => {
          dispatch(changeCityName(cityName));
        }
      }
    >
      <span>{cityName}</span>
    </Link>
  );
}

export default CityLink;
