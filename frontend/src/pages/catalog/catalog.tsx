import ProductList from '../../components/product-list/product-list';

const Catalog = (): JSX.Element => (
    <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
            <section className="locations container">
                <ProductList />
            </section>
        </div>
    </main>
);

export default Catalog;
