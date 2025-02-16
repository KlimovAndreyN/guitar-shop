import { Helmet } from 'react-helmet-async';

import BreadcrumbList from '../../components/breadcrumb-list/breadcrumb-list';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import ProductList from '../../components/product-list/product-list';
import Pagination from '../../components/pagination/pagination';
import history from '../../history';
import { AppRoute, PageTitle } from '../../const';

const Catalog = (): JSX.Element => {
    const handleAddProductButtonClick = () => {
        history.push(AppRoute.ProductAdd);
    };

    return (
        <main className="page-content">
            <Helmet>
                <title>{PageTitle.Catalog}</title>
            </Helmet>
            <section className="product-list">
                <div className="container">
                    <h1 className="product-list__title">Список товаров</h1>
                    <BreadcrumbList />
                    <div className="catalog">
                        <CatalogFilter />
                        <CatalogSort />
                        <ProductList />
                    </div>
                    <button className="button product-list__button button--red button--big" onClick={handleAddProductButtonClick}>Добавить новый товар</button>
                    <Pagination />
                </div>
            </section>
        </main>
    );
};

export default Catalog;
