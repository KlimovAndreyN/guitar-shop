import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import LoginForm from '../../components/login-form/login-form';
import { useAppDispatch } from '../../hooks';
import { loginUser } from '../../store/action';
import type { UserLogin } from '../../types/types';
import { AppRoute, PageTitle } from '../../const';

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (userLogin: UserLogin) => {
    dispatch(loginUser(userLogin));
  };

  return (
    <main className="page-content">
      <Helmet>
        <title>{PageTitle.Login}</title>
      </Helmet>
      <div className="container">
        <section className="login">
          <h1 className="login__title">Войти</h1>
          <p className="login__text">Hовый пользователь? <Link className="login__link" to={AppRoute.Register}>Зарегистрируйтесь</Link> прямо сейчас</p>
          <LoginForm onSubmit={handleFormSubmit} />
        </section>
      </div>
    </main>
  );
};

export default Login;
