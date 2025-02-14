import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsAuthorized, getUserName } from '../../store/user-process/selectors';
import { logoutUser } from '../../store/action';
import { AppRoute } from '../../const';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getIsAuthorized);
  const userName = useAppSelector(getUserName);
  const className = classNames('header', { 'header--admin': isAuthorized });
  const handleLogoutClick = () => {
    if (isAuthorized) {
      dispatch(logoutUser());
    }
  };

  return (
    <header className={className} id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to={AppRoute.Root}>
            <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
          </Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item"><a className="link main-nav__link" href="#">Каталог</a>
              </li>
              {
                isAuthorized
                  ?
                  <li className="main-nav__item">
                    <Link className="link main-nav__link" to={AppRoute.Catalog}>Список товаров</Link>
                  </li>
                  :
                  <>
                    <li className="main-nav__item">
                      <a className="link main-nav__link" href="#">Где купить?</a>
                    </li>
                    <li className="main-nav__item">
                      <a className="link main-nav__link" href="#">О компании</a>
                    </li>
                  </>
              }
            </ul>
          </nav>
          <div className="header__container"><span className="header__user-name">{userName}</span>
            <Link className="header__link" aria-label="Перейти в личный кабинет" to={AppRoute.Root} onClick={handleLogoutClick}>
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
