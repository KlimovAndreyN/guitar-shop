import history from '../../history';
import { AppRoute } from '../../const';

const NotFound = (): JSX.Element => {
    const navigateToMain = () => {
        history.push(AppRoute.Root);
    };

    return (
        <main className="page-content">
            <div className="container">
                <section className="error">
                    <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
                    <p className="error__text"> Возможно, страница была удалена или<br />её вовсе не существовало.</p>
                    <button className="button button__error button--small button--black-border" onClick={navigateToMain}>Продолжить покупки</button>
                </section>
            </div>
        </main>
    );
};

export default NotFound;
