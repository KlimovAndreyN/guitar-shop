import type { FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';

import PasswordInput from '../../components/password-input/password-input';
import type { UserRegister } from '../../types/types';
import { useAppDispatch } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { registerUser } from '../../store/action';
import { PageTitle } from '../../const';

const Register = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form) as Iterable<[UserRegister]>;
    const data = Object.fromEntries(formData);

    dispatch(registerUser(data));
  };

  useScrollToTop();

  return (
    <main className="page-content">
      <Helmet>
        <title>{PageTitle.Registration}</title>
      </Helmet>
      <div className="container">
        <section className="login">
          <h1 className="login__title">Регистрация</h1>
          <form method="post" action="/" onSubmit={handleFormSubmit}>
            <div className="input-login">
              <label htmlFor="name">Введите имя</label>
              <input type="text" id="name" name="name" autoComplete="off" required />
              <p className="input-login__error">Заполните поле</p>
            </div>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input type="email" id="email" name="email" autoComplete="off" required />
              <p className="input-login__error">Заполните поле</p>
            </div>
            <PasswordInput isFromRegistration />
            <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Register;
