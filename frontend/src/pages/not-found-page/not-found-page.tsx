import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute, PageTitle } from '../../const';
import Header from '../../components/header/header';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{PageTitle.NotFound}</title>
      </Helmet>
      <Header />

      <main className="page__main">
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">404 Not Found</b>
                <p className="cities__status-description">
                  <u>
                    <Link to={AppRoute.Main}>Main page</Link>
                  </u>
                </p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
