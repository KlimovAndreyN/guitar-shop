import type { FormEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import type { CityName, UserAuth } from '../../types/types';
import { useAppDispatch } from '../../hooks';
import { loginUser } from '../../store/action';
import { getRandomElement } from '../../utils';
import { AppRoute, CITIES, PageTitle } from '../../const';
import { setCity } from '../../store/site-process/site-process';
import { Helmet } from 'react-helmet-async';

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form) as Iterable<[UserAuth]>;
    const data = Object.fromEntries(formData);

    dispatch(loginUser(data));
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const cityName = e.currentTarget.textContent as CityName;
    dispatch(setCity(cityName));
  };

  return (
    <>
      <Helmet>
        <title>{PageTitle.Login}</title>
      </Helmet>

      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Войти</h1>
            <p className="login__text">Hовый пользователь? <Link className="login__link" to={AppRoute.Register}>Зарегистрируйтесь</Link> прямо сейчас</p>
            <form method="post" action="/">
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
    </>
  );
};

/*
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden" htmlFor="email">E-mail</label>
              <input
                id="email"
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden" htmlFor="password">Password</label>
              <input
                id="password"
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button
              className="login__submit form__submit button"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" onClick={handleLinkClick} to={AppRoute.Root}>
              <span>{getRandomElement<CityName>(CITIES)}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
*/

export default Login;
