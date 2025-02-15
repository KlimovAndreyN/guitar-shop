import { Helmet } from 'react-helmet-async';

import ProductList from '../../components/product-list/product-list';
import { PageTitle } from '../../const';

const Catalog = (): JSX.Element => (
    <main className="page__main page__main--index">
        <Helmet>
            <title>{PageTitle.Registration}</title>
        </Helmet>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
            <section className="locations container">
                <ProductList />
            </section>
        </div>
    </main>
);

export default Catalog;
