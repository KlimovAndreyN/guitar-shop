import { Link } from 'react-router-dom';
//import classNames from 'classnames';

//import { useAppDispatch, useAppSelector } from '../../hooks';
//import { logoutUser } from '../../store/action';
import { AppRoute/*, AuthorizationStatus*/ } from '../../const';

/*
type HeaderProps = {
  isHiddenUserInfo?: boolean;
}
*/

function Header(/*{ isHiddenUserInfo }: HeaderProps*/): JSX.Element {
  //!const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  //!const user = useAppSelector((state) => state.user);
  //const dispatch = useAppDispatch();
  //!const isAuthUser = authorizationStatus === AuthorizationStatus.Auth;
  //const logoLinkClassName = classNames('header__logo-link', { 'header__logo-link--active': !isHiddenUserInfo });

  /*
    const handleSignOutClick = () => {
      dispatch(logoutUser());
    };
  */

  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to={AppRoute.Root}>
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
            <Link className="header__link" to={AppRoute.Root} aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg><span className="header__link-text">Вход</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;

/*
---------------------------------

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
---------------------------------


import { Link, Outlet, useLocation } from 'react-router-dom';

import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteOffers } from '../../store/site-data/selectors';
import { getIsAuthorized, getUser } from '../../store/user-process/selectors';
import { logoutUser } from '../../store/action';

const pagesWithoutNavigation = [AppRoute.Login, AppRoute.Register];

const Header = () => {
  const { pathname } = useLocation() as { pathname: AppRoute };
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getIsAuthorized);
  const user = useAppSelector(getUser);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const handleLogoutClick = () => {
    if (isAuthorized) {
      dispatch(logoutUser());
    }
  };

  const RootClassName: Record<AppRoute, string> = {
    [AppRoute.Root]: 'page--gray page--main',
    [AppRoute.Login]: 'page--gray page--login',
    [AppRoute.Register]: 'page--gray page--login',
    [AppRoute.Property]: '',
    [AppRoute.Add]: '',
    [AppRoute.Edit]: '',
    [AppRoute.NotFound]: '',
  };

  return (
    <div className={`page ${RootClassName[pathname]}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Root}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuthorized && (
                  <>
                    <li className="header__nav-item header__nav-item--new">
                      <Link className="header__nav-link header__nav-link--new" to={AppRoute.Add}>
                        <span>+ New offer</span>
                      </Link>
                    </li>
                    <li className="header__nav-item user">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                          {user}
                        </span>
                        <span className="header__favorite-count">{favoriteOffers.length}</span>
                      </Link>
                    </li>
                  </>)}
                {!pagesWithoutNavigation.includes(pathname) && (
                  <>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to={isAuthorized ? AppRoute.Root : AppRoute.Login} onClick={handleLogoutClick}>
                        <span className="header__signout">{isAuthorized ? 'Sign out' : 'Sign in'}</span>
                      </Link>
                    </li>
                    {!isAuthorized && (
                      <li className="header__nav-item">
                        <Link className="header__nav-link" to={AppRoute.Register}>
                          <span className="header__signout">Sign Up</span>
                        </Link>
                      </li>
                    )}
                  </>)}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
*/
