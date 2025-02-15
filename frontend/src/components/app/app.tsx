import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../header/header';
import Footer from '../footer/footer';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import Catalog from '../../pages/catalog/catalog';

import Property from '../../pages/property/property';
import AddOffer from '../../pages/add-offer/add-offer';
import EditOffer from '../../pages/edit-offer/edit-offer';

import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import history from '../../history';
import { AppRoute, AuthorizationStatus } from '../../const';

const App = (): JSX.Element => (
  <HelmetProvider>
    <HistoryRouter history={history}>
      <Header />
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Catalog}>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Register}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Catalog}>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Catalog}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Root}>
              <Catalog />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Property}/:id`}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Root}>
              <Property />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Property}/:id${AppRoute.Edit}`}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Root}>
              <EditOffer />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Add}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Root}>
              <AddOffer />
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
