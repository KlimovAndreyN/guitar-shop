import { Helmet } from 'react-helmet-async';

import ProductList from '../../components/product-list/product-list';
import { PageTitle } from '../../const';

const Catalog = (): JSX.Element => (
    <main className="page-content">
        <Helmet>
            <title>{PageTitle.Catalog}</title>
        </Helmet>
        <ProductList />
    </main>
);

export default Catalog;
