import { useState, FormEvent } from 'react';

import { UserLogin } from '../../types/types';

enum FormFieldName {
  login = 'email',
  password = 'password'
}

enum PasswordTypeTabOption {
  Password = 'password',
  Text = 'text'
}

const isPasswordType = (value: PasswordTypeTabOption) => (value === PasswordTypeTabOption.Password);

type LoginFormProps = {
  onSubmit: (userLogin: UserLogin) => void;
};

const LoginForm = ({ onSubmit }: LoginFormProps): JSX.Element => {
  const passwordType = PasswordTypeTabOption.Password;
  const [chosenPasswordType, setPasswordType] = useState(passwordType);

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

  const handleShowPasswordButtonClick = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (isPasswordType(chosenPasswordType)) {
      setPasswordType(PasswordTypeTabOption.Text);
    }
    else {
      setPasswordType(PasswordTypeTabOption.Password);
    }
  };

  return (
    <form method="post" action="/" onSubmit={handleFormSubmit}>
      <div className="input-login">
        <label htmlFor="email">Введите e-mail</label>
        <input type="text" id="email" name="email" autoComplete="off" required />
        <p className="input-login__error">Заполните поле</p>
      </div>
      <div className="input-login">
        <label htmlFor="passwordLogin">Введите пароль</label>
        <span>
          <input type={chosenPasswordType} placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password" autoComplete="off" required />
          <button className="input-login__button-eye" type="button" onClick={handleShowPasswordButtonClick}>
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
};

export default LoginForm;
