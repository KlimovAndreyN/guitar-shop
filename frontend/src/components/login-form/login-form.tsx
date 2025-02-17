import { FormEvent } from 'react';

import { UserLogin } from '../../types/types';
import PasswordInput from '../password-input/password-input';

enum FormFieldName {
  login = 'email',
  password = 'password'
}

type LoginFormProps = {
  onSubmit: (userLogin: UserLogin) => void;
};

const LoginForm = ({ onSubmit }: LoginFormProps): JSX.Element => {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: UserLogin = {
      login: formData.get(FormFieldName.login)?.toString(),
      password: formData.get(FormFieldName.password)?.toString()
    };

    onSubmit(data);
  };

  return (
    <form method="post" action="/" onSubmit={handleFormSubmit}>
      <div className="input-login">
        <label htmlFor="email">Введите e-mail</label>
        <input type="text" id="email" name="email" autoComplete="off" required />
        <p className="input-login__error">Заполните поле</p>
      </div>
      <PasswordInput />
      <button className="button login__button button--medium" type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;
