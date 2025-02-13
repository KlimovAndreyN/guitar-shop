import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import Header from '../../components/header/header';
import LoginFrom from '../../components/login-form/login-form';
import { AppRoute, PageTitle } from '../../const';
import Footer from '../../components/footer/footer';

function LoginPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{PageTitle.Login}</title>
      </Helmet>
      <Header isHiddenUserInfo />

      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Войти</h1>
            <p className="login__text">Hовый пользователь? <Link className="login__link" to={AppRoute.Registration}>Зарегистрируйтесь</Link> прямо сейчас</p>
            <LoginFrom />
          </section>
        </div>
      </main >

      <Footer />
    </>
  );
}

export default LoginPage;
