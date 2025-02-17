import { useState, FormEvent } from 'react';

enum PasswordTypeTabOption {
  Password = 'password',
  Text = 'text'
}

const isPasswordType = (value: PasswordTypeTabOption) => (value === PasswordTypeTabOption.Password);

type PasswordInputProps = {
  isFromRegistration?: boolean;
};

const PasswordInput = ({ isFromRegistration = false }: PasswordInputProps): JSX.Element => {
  const inputId = isFromRegistration ? 'password' : 'passwordLogin';
  const labelText = isFromRegistration ? 'Придумайте пароль' : 'Введите пароль';
  const passwordType = PasswordTypeTabOption.Password;
  const [chosenPasswordType, setPasswordType] = useState(passwordType);

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
    <div className="input-login">
      <label htmlFor={inputId}>{labelText}</label>
      <span>
        <input type={chosenPasswordType} placeholder="• • • • • • • • • • • •" id={inputId} name="password" autoComplete="off" required />
        <button className="input-login__button-eye" type="button" onClick={handleShowPasswordButtonClick}>
          <svg width="14" height="8" aria-hidden="true">
            <use xlinkHref="#icon-eye"></use>
          </svg>
        </button>
      </span>
      <p className="input-login__error">Заполните поле</p>
    </div>
  );
};

export default PasswordInput;
