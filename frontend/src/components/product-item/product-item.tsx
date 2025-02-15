import { AppRoute } from '../../const';

type ProductItemProps = {
  id: string;
  title: string;
  addedDate: string;
  price: number;
  imagePath: string;
}

const ProductItem = ({ id, title, addedDate, price, imagePath }: ProductItemProps): JSX.Element => (
  <li className="catalog-item">
    <div className="catalog-item__data">
      <img src={imagePath/*"img/content/catalog-product-1.png" //! srcSet ? */} srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" />
      <div className="catalog-item__data-wrapper">
        <a className="link" href={`${AppRoute.Product}/${id}`}>
          <p className="catalog-item__data-title">{title}</p>
        </a>
        <br />
        <p className="catalog-item__data-date">Дата добавления {addedDate}</p>
        <p className="catalog-item__data-price">{price.toLocaleString('ru-RU')} ₽</p>
      </div>
    </div>
    <div className="catalog-item__buttons">
      <a className="button button--small button--black-border" href="edit-item.html" aria-label="Редактировать товар">Редактировать</a>
      <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
    </div>
  </li>
);

export default ProductItem;
