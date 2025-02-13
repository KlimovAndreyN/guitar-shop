import { FormEvent, useRef } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { Password } from '../../const';

function LoginFrom(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const login = loginRef.current.value;
      const password = passwordRef.current.value;
      if (Password.CHECK_REGEXP.test(password)) {
        dispatch(loginAction({ login, password }));
      } else {
        toast.warn(Password.WARNING_MESSGAGE);
      }
    }
  };

  return (
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
  );
  {/*
    <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required />
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
   */}
}

export default LoginFrom;
