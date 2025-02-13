import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import LoginFrom from '../../components/login-form/login-form';
import { CityName } from '../../types';
import { getRandomArrayElement } from '../../utils/common';
import { CITIES_NAMES, PageTitle } from '../../const';
import CityLink from '../../components/city-link/city-link';

function LoginPage(): JSX.Element {
  const randomCityName = getRandomArrayElement<CityName>([...CITIES_NAMES]);

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>{PageTitle.Login}</title>
      </Helmet>
      <Header isHiddenUserInfo />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginFrom />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <CityLink cityName={randomCityName} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
