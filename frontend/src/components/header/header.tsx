import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';

type HeaderProps = {
  isHiddenUserInfo?: boolean;
}

function Header({ isHiddenUserInfo }: HeaderProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const isAuthUser = authorizationStatus === AuthorizationStatus.Auth;
  const logoLinkClassName = classNames('header__logo-link', { 'header__logo-link--active': !isHiddenUserInfo });

  const handleSignOutClick = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to={AppRoute.Main}>
            <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
          </Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item"><a className="link main-nav__link" href="#">Каталог</a>
              </li>
              <li className="main-nav__item"><a className="link main-nav__link" href="#">Где купить?</a>
              </li>
              <li className="main-nav__item"><a className="link main-nav__link" href="#">О компании</a>
              </li>
            </ul>
          </nav>
          <div className="header__container"><span className="header__user-name">Имя</span>
            <Link className="header__link" to={AppRoute.Login} aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg><span className="header__link-text">Вход</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
  /*
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={logoLinkClassName} to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {
            (isHiddenUserInfo)
              ?
              null
              :
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    {
                      (isAuthUser)
                        ?
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Main}>
                          <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: `url(${user.avatarUrl})` }}>
                          </div>
                          <span className="header__user-name user__name">{user.email}</span>
                          <span className="header__favorite-count">{favoriteOfferCount || getFavoriteOffersCount(offers)}</span>
                        </Link>
                        :
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                          </div>
                          <span className="header__login">Sign in</span>
                        </Link>
                    }
                  </li>
                  {
                    (isAuthUser)
                      ?
                      <li className="header__nav-item">
                        <Link className="header__nav-link" to="" onClick={handleSignOutClick}>
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>
                      :
                      null
                  }
                </ul>
              </nav>
          }
        </div>
      </div>
    </header>
  */
}
export default Header;
