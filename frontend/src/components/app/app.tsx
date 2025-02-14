import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../header/header';
import Footer from '../footer/footer';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import AddOffer from '../../pages/add-offer/add-offer';
import EditOffer from '../../pages/edit-offer/edit-offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import history from '../../history';

const App = (): JSX.Element => (
  <HelmetProvider>
    <HistoryRouter history={history}>
      <Header />
      <Routes>
        <Route index element={<Login />} />
        <Route path={'main'/* //! */} element={<Main />} />
        <Route path={`${AppRoute.Property}/:id`} element={<Property />} />
        <Route
          path={`${AppRoute.Property}/:id${AppRoute.Edit}`}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
              <EditOffer />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Add}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
              <AddOffer />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Root}>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Register}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Root}>
              <Register />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </HistoryRouter>
  </HelmetProvider>
);

export default App;
