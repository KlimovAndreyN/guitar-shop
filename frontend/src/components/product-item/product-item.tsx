import { FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

type ProductItemProps = {
  id: string;
  title: string;
  addedDate: string;
  price: number;
  //imagePath: string;
}

const ProductItem = ({ id, title, addedDate, price/*, imagePath*/ }: ProductItemProps): JSX.Element => {
  const editLink = AppRoute.ProductEdit.replace(':id', id);
  //!
  const imagePath = '/img/content/catalog-product-1.png';
  const srcSet = '/img/content/catalog-product-1@2x.png 2x';

  const handleDeleteButtonClick = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    //!
    // eslint-disable-next-line no-console
    console.log(`handleDeleteButtonClick - ${id}`);
    //! обновить родителя или самоудалиться или обработчик перенести в родителя
  };

  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={imagePath} srcSet={srcSet} width="36" height="93" alt="Картинка гитары" />
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
        <Link className="button button--small button--black-border" to={editLink} aria-label="Редактировать товар">Редактировать</Link>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар" onClick={handleDeleteButtonClick}>Удалить</button>
      </div>
    </li>
  );
};

export default ProductItem;
