import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../header/header';
import Footer from '../footer/footer';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import Catalog from '../../pages/catalog/catalog';
import Product from '../../pages/product/product';
import AddProduct from '../../pages/add-product/add-product';
import EditProduct from '../../pages/edit-product/edit-product';

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
          path={`${AppRoute.Product}/:id`}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Root}>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.ProductEdit}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Root}>
              <EditProduct />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.ProductAdd}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Root}>
              <AddProduct />
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
