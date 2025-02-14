import type { FormEvent } from 'react';

import type { UserRegister } from '../../types/types';
import { useAppDispatch } from '../../hooks';
import { registerUser } from '../../store/action';

const Register = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form) as Iterable<[UserRegister]>;
    const data = Object.fromEntries(formData);

    dispatch(registerUser(data));
  };

  return (
    <main className="page-content">
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
            <div className="input-login">
              <label htmlFor="password">Придумайте пароль</label>
              <span>
                <input type="password" placeholder="• • • • • • • • • • • •" id="password" name="password" autoComplete="off" required />
                <button className="input-login__button-eye" type="button">
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button>
              </span>
              <p className="input-login__error">Заполните поле</p>
            </div>
            <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Register;
