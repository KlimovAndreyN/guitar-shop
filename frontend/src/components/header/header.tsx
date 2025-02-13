import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getFavoriteOffersCount } from '../../utils/offer';
import { AppRoute, AuthorizationStatus } from '../../const';

type HeaderProps = {
  favoriteOfferCount?: number;
  isHiddenUserInfo?: boolean;
}

function Header({ favoriteOfferCount, isHiddenUserInfo }: HeaderProps): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const isAuthUser = authorizationStatus === AuthorizationStatus.Auth;
  const logoLinkClassName = classNames('header__logo-link', { 'header__logo-link--active': !isHiddenUserInfo });

  const handleSignOutClick = () => {
    dispatch(logoutAction());
  };

  return (
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
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
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
  );
}

export default Header;
