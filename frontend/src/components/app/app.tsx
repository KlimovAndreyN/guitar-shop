import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import MainPage from '../../pages/main-page/main-page';
import PublicRoute from '../public-route/public-route';
import PrivateRoute from '../private-route/private-route';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import Spinner from '../spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthAction } from '../../store/api-actions';
import { AppRoute, PageTitle, AuthorizationStatus } from '../../const';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if ((authorizationStatus === AuthorizationStatus.Unknown)) {
    return (
      <Spinner />
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{PageTitle.Root}</title>
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Login}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={
              <OfferPage />
            }
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
