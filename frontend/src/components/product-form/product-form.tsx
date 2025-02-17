import { ChangeEvent, FormEvent, Fragment, MouseEvent, useState } from 'react';

import { toMoneyRuLocate } from '../../utils/common';
import { DetailProduct } from '../../types/backend';
import { ProductDto } from '../../types/types';
import { GuitarTypeTitle, GuitarType, STRINGS_COUNT_VALUES, StringsCount } from '../../const';

enum FormFieldName {
  title = 'title',
  description = 'description',
  guitarType = 'item-type',
  imageFile = 'imageFile',
  stringsCount = 'string-qty',
  addedDate = 'date',
  article = 'sku',
  price = 'price'
}

type ProductFormProps = {
  isEditing: boolean;
  prefixClassName: string;
  product: DetailProduct;
  onCancel: () => void;
  onSubmit: (productData: ProductDto) => void;
};

const ProductForm = (props: ProductFormProps): JSX.Element => {
  const { isEditing, prefixClassName, product, onSubmit, onCancel } = props;
  const {
    id,
    title,
    article,
    description,
    addedDate,
    guitarType,
    stringsCount,
    price,
    imagePath: imagePathProduct
  } = product;
  const priceString = (price) ? toMoneyRuLocate(price) : '';
  const imageEditButtonCaption = isEditing ? 'Заменить' : 'Добавить';
  const guitarTypeSpanText = isEditing ? 'Тип товара' : 'Выберите тип товара';
  const titleSpanText = isEditing ? 'Наименование товара' : 'Введите наименование товара';
  const priceSpanText = isEditing ? 'Цена товара' : 'Введите цену товара';
  const artileSpanText = isEditing ? 'Артикул товара' : 'Введите артикул товара';
  const descriptionSpanText = isEditing ? 'Описание товара' : 'Введите описание товара';
  //! временно
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [imagePath, setImagePath] = useState<string | undefined>(imagePathProduct);

  const handleImageFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    setImageFile(event.target.files[0]);
  };

  const handleImageEditButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const fileInput = document.getElementById('imageFile');

    if (fileInput) {
      fileInput.click();
    }
  };

  const handleImageDeleteButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setImagePath(undefined);
    setImageFile(undefined);
  };

  const handleBackButtonClick = () => {
    onCancel();
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: ProductDto = {
      article: formData.get(FormFieldName.article)?.toString(),
      description: formData.get(FormFieldName.description)?.toString(),
      imageFile,
      guitarType: formData.get(FormFieldName.guitarType)?.toString() as GuitarType,
      price: parseInt((formData.get(FormFieldName.price)?.toString() || '').replaceAll(String.fromCharCode(160), ''), 10),
      stringsCount: parseInt(formData.get(FormFieldName.stringsCount)?.toString() || '', 10) as StringsCount,
      title: formData.get(FormFieldName.title)?.toString()
    };

    if (isEditing) {
      data.id = id;
      data.addedDate = formData.get(FormFieldName.addedDate)?.toString();
    }

    onSubmit(data);
  };

  const imageSrc = imageFile ? URL.createObjectURL(imageFile) : imagePath;

  return (
    <form className={`${prefixClassName}-item__form`} action="#" method="post" onSubmit={handleFormSubmit} >
      <div className={`${prefixClassName}-item__form-left`}>
        <div className={`edit-item-image ${prefixClassName}-item__form-image`}>
          <div className="edit-item-image__image-wrap">
            <input
              className="visually-hidden hidden"
              type="file"
              name="imageFile"
              id="imageFile"
              accept="image/png, image/jpeg"
              onChange={handleImageFileInputChange}
            />
            <label htmlFor="imageFile">
              {
                imageFile || imagePath
                  ? <img className="edit-item-image__image" src={imageSrc} srcSet="" width="133" height="332" alt={title} />
                  : ''
              }
            </label>
          </div>
          <div className="edit-item-image__btn-wrap">
            <button className="button button--small button--black-border edit-item-image__btn" onClick={handleImageEditButtonClick}>{imageEditButtonCaption}</button>
            <button className="button button--small button--black-border edit-item-image__btn" onClick={handleImageDeleteButtonClick}>Удалить</button>
          </div>
        </div>
        <div className={`input-radio ${prefixClassName}-item__form-radio`}><span>{guitarTypeSpanText}</span>
          {
            Object.values(GuitarType).map(
              (type) => {
                const key = type;
                const inputId = type;
                const isChecked = isEditing && (type === guitarType);

                return (
                  <Fragment key={key}>
                    <input type="radio" id={inputId} name="item-type" value={type} defaultChecked={isChecked} />
                    <label htmlFor={inputId}>{GuitarTypeTitle[type]}</label>
                  </Fragment>
                );
              }
            )
          }
        </div>
        <div className={`input-radio ${prefixClassName}-item__form-radio`}><span>Количество струн</span>
          {
            STRINGS_COUNT_VALUES.map(
              (value) => {
                const inputName = 'string-qty';
                const inputId = `${inputName}-${value}`;
                const isChecked = isEditing && (value === stringsCount);

                return (
                  <Fragment key={`${value}`}>
                    <input type="radio" id={inputId} name={inputName} value={value} defaultChecked={isChecked} />
                    <label htmlFor={inputId}>{value}</label>
                  </Fragment>
                );
              }
            )
          }
        </div>
      </div>
      <div className={`${prefixClassName}-item__form-right`}>
        <div className={`custom-input ${prefixClassName}-item__form-input`}>
          <label><span>Дата добавления товара</span>
            <input type="text" name="date" defaultValue={addedDate} placeholder="Дата в формате 00.00.0000" readOnly={!isEditing} />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className={`custom-input ${prefixClassName}-item__form-input`}>
          <label><span>{titleSpanText}</span>
            <input type="text" name="title" defaultValue={title} placeholder="Наименование" />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className={`custom-input ${prefixClassName}-item__form-input ${prefixClassName}-item__form-input--price${isEditing ? '' : ' is-placeholder'}`}>
          <label><span>{priceSpanText}</span>
            <input type="text" name="price" defaultValue={priceString} placeholder="Цена в формате 00 000" />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className={`custom-input ${prefixClassName}-item__form-input`}>
          <label><span>{artileSpanText}</span>
            <input type="text" name="sku" defaultValue={article} placeholder="Артикул товара" />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className={`custom-textarea ${prefixClassName}-item__form-textarea`}>
          <label><span>{descriptionSpanText}</span>
            <textarea name="description" placeholder="" defaultValue={description}></textarea>
          </label>
          <p>Заполните поле</p>
        </div>
      </div>
      <div className={`${prefixClassName}-item__form-buttons-wrap`}>
        <button className={`button button--small ${prefixClassName}-item__form-button`} type="submit">Сохранить изменения</button>
        <button className={`button button--small ${prefixClassName}-item__form-button`} type="button" onClick={handleBackButtonClick}>Вернуться к списку товаров</button>
      </div>
    </form>
  );
};

export default ProductForm;
