import type { FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import type { UserAuth } from '../../types/types';
import { useAppDispatch } from '../../hooks';
import { loginUser } from '../../store/action';
import { AppRoute, PageTitle } from '../../const';

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form) as Iterable<[UserAuth]>;
    const data = Object.fromEntries(formData);

    dispatch(loginUser(data));
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
          <form method="post" action="/" onSubmit={handleFormSubmit}>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input type="email" id="email" name="email" autoComplete="off" required />
              <p className="input-login__error">Заполните поле</p>
            </div>
            <div className="input-login">
              <label htmlFor="passwordLogin">Введите пароль</label>
              <span>
                <input type="password" placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password" autoComplete="off" required />
                <button className="input-login__button-eye" type="button">
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button>
              </span>
              <p className="input-login__error">Заполните поле</p>
            </div>
            <button className="button login__button button--medium" type="submit">Войти</button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;
