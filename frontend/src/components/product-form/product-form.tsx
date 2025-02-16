/*
import { FormEvent, useState } from 'react';
import Select from 'react-select';

import { City, NewOffer, Offer } from '../../types/types';

import { CITIES, CityLocation, GOODS, TYPES } from '../../const';
import { capitalize } from '../../utils/common';

enum FormFieldName {
  title = 'title',
  description = 'description',
  cityName = 'cityName',
  previewImage = 'previewImage',
  isPremium = 'isPremium',
  type = 'type',
  bedrooms = 'bedrooms',
  maxAdults = 'maxAdults',
  price = 'price',
  good = 'good-',
  image = 'image'
}

const getGoods = (
  entries: IterableIterator<[string, FormDataEntryValue]>
): string[] => {
  const chosenGoods: string[] = [];
  for (const entry of entries) {
    if (entry[0].startsWith(FormFieldName.good)) {
      chosenGoods.push(entry[0].slice(FormFieldName.good.length));
    }
  }
  return chosenGoods;
};

const getCity = (cityName: FormDataEntryValue | null): City => {
  const name = String(cityName);
  if (cityName && CITIES.includes(name)) {
    return {
      name,
      location: CityLocation[name],
    };
  }

  return { name: CITIES[0], location: CityLocation[CITIES[0]] };
};

const getImages = (
  entries: IterableIterator<[string, FormDataEntryValue]>
): string[] => {
  const enteredImages: string[] = [];
  for (const entry of entries) {
    if (entry[0].startsWith(FormFieldName.image) && typeof entry[1] === 'string') {
      enteredImages.push(entry[1]);
    }
  }
  return enteredImages;
};

type OfferFormProps<T> = {
  offer: T;
  onSubmit: (offerData: T) => void;
};
*/

const ProductForm = /*<T extends Offer | NewOffer>*/(/*{
  offer,
  onSubmit,
}: OfferFormProps<T>*/): JSX.Element => (
  /*
  {
    const {
      title,
      description,
      city,
      previewImage,
      isPremium,
      type,
      bedrooms,
      maxAdults,
      price,
      goods: chosenGoods,
      location,
      images
    } = offer;
    const [chosenLocation, setChosenLocation] = useState(location);

    const handleCityChange = (value: keyof typeof CityLocation) => {
      setChosenLocation(CityLocation[value]);
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const data = {
        ...offer,
        title: formData.get(FormFieldName.title),
        description: formData.get(FormFieldName.description),
        city: getCity(formData.get(FormFieldName.cityName)),
        previewImage: formData.get(FormFieldName.previewImage),
        isPremium: Boolean(formData.get(FormFieldName.isPremium)),
        type: formData.get(FormFieldName.type),
        bedrooms: Number(formData.get(FormFieldName.bedrooms)),
        maxAdults: Number(formData.get(FormFieldName.maxAdults)),
        price: Number(formData.get(FormFieldName.price)),
        goods: getGoods(formData.entries()),
        location: chosenLocation,
        images: getImages(formData.entries()),
      };

      onSubmit(data);
    };
  return (
    <form
      className="form offer-form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <fieldset className="title-fieldset">
        <div className="form__input-wrapper">
          <label htmlFor="title" className="title-fieldset__label">
            Title
          </label>
          <input
            className="form__input title-fieldset__text-input"
            placeholder="Title"
            name={FormFieldName.title}
            id="title"
            required
            defaultValue={title}
          />
        </div>
        <div className="title-fieldset__checkbox-wrapper">
          <input
            className="form__input"
            type="checkbox"
            name={FormFieldName.isPremium}
            id="isPremium"
            defaultChecked={isPremium}
          />
          <label htmlFor="isPremium" className="title-fieldset__checkbox-label">
            Premium
          </label>
        </div>
      </fieldset>
      <div className="form__input-wrapper">
        <label htmlFor="description" className="offer-form__label">
          Description
        </label>
        <textarea
          className="form__input offer-form__textarea"
          placeholder="Description"
          name={FormFieldName.description}
          id="description"
          required
          defaultValue={description}
        />
      </div>
      <div className="form__input-wrapper">
        <label htmlFor="previewImage" className="offer-form__label">
          Preview Image
        </label>
        <input
          className="form__input offer-form__text-input"
          type="url"
          placeholder="Preview image"
          name={FormFieldName.previewImage}
          id="previewImage"
          required
          defaultValue={previewImage}
        />
      </div>
      <fieldset className="images-fieldset">
        {images.map((image, index) => (
          <div key={image} className="form__input-wrapper">
            <label htmlFor={`image=${index}`} className="offer-form__label">
              Offer Image #{index + 1}
            </label>
            <input
              className="form__input offer-form__text-input"
              type="url"
              placeholder="Offer image"
              name={`${FormFieldName.image}-${index}`}
              id={`image-${index}`}
              required
              defaultValue={image}
            />
          </div>
        ))}

      </fieldset>
      <fieldset className="type-fieldset">
        <div className="form__input-wrapper">
          <label htmlFor="type" className="type-fieldset__label">
            Type
          </label>
          <Select
            className="type-fieldset__select"
            classNamePrefix="react-select"
            name={FormFieldName.type}
            id="type"
            defaultValue={{ value: type, label: capitalize(type) }}
            options={TYPES.map((typeItem) => ({
              value: typeItem,
              label: capitalize(typeItem),
            }))}
          />
        </div>
        <div className="form__input-wrapper">
          <label htmlFor="price" className="type-fieldset__label">
            Price
          </label>
          <input
            className="form__input type-fieldset__number-input"
            type="number"
            placeholder="100"
            name={FormFieldName.price}
            id="price"
            defaultValue={price}
          />
        </div>
        <div className="form__input-wrapper">
          <label htmlFor="bedrooms" className="type-fieldset__label">
            Bedrooms
          </label>
          <input
            className="form__input type-fieldset__number-input"
            type="number"
            placeholder="1"
            name={FormFieldName.bedrooms}
            id="bedrooms"
            required
            step={1}
            defaultValue={bedrooms}
          />
        </div>
        <div className="form__input-wrapper">
          <label htmlFor="maxAdults" className="type-fieldset__label">
            Max adults
          </label>
          <input
            className="form__input type-fieldset__number-input"
            type="number"
            placeholder="1"
            name={FormFieldName.maxAdults}
            id="maxAdults"
            required
            step={1}
            defaultValue={maxAdults}
          />
        </div>
      </fieldset>
      <fieldset className="goods-list">
        <h2 className="goods-list__title">Goods</h2>
        <ul className="goods-list__list">
          {GOODS.map((good) => (
            <li key={good} className="goods-list__item">
              <input
                type="checkbox"
                id={good}
                name={`${FormFieldName.good}${good}`}
                defaultChecked={chosenGoods.includes(good)}
              />
              <label className="goods-list__label" htmlFor={good}>
                {good}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <div className="form__input-wrapper location-picker">
        <label htmlFor="cityName" className="location-picker__label">
          Location
        </label>
        <Select
          className="location-picker__select"
          classNamePrefix="react-select"
          name={FormFieldName.cityName}
          id="cityName"
          defaultValue={{ value: city.name, label: city.name }}
          options={CITIES.map((cityItem) => ({
            value: cityItem,
            label: cityItem,
          }))}
          onChange={(evt) => {
            if (evt) {
              handleCityChange(evt.value);
            }
          }}
        />
      </div>
      <button className="form__submit button" type="submit">
        Save
      </button>
    </form>
  );
  */
  <form className="add-item__form" action="#" method="get">
    <div className="add-item__form-left">
      <div className="edit-item-image add-item__form-image">
        <div className="edit-item-image__image-wrap">
        </div>
        <div className="edit-item-image__btn-wrap">
          <button className="button button--small button--black-border edit-item-image__btn">Добавить
          </button>
          <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
        </div>
      </div>
      <div className="input-radio add-item__form-radio"><span>Выберите тип товара</span>
        <input type="radio" id="guitar" name="item-type" value="guitar" />
        <label htmlFor="guitar">Акустическая гитара</label>
        <input type="radio" id="el-guitar" name="item-type" value="el-guitar" checked />
        <label htmlFor="el-guitar">Электрогитара</label>
        <input type="radio" id="ukulele" name="item-type" value="ukulele" />
        <label htmlFor="ukulele">Укулеле</label>
      </div>
      <div className="input-radio add-item__form-radio"><span>Количество струн</span>
        <input type="radio" id="string-qty-4" name="string-qty" value="4" checked />
        <label htmlFor="string-qty-4">4</label>
        <input type="radio" id="string-qty-6" name="string-qty" value="6" />
        <label htmlFor="string-qty-6">6</label>
        <input type="radio" id="string-qty-7" name="string-qty" value="7" />
        <label htmlFor="string-qty-7">7</label>
        <input type="radio" id="string-qty-12" name="string-qty" value="12" />
        <label htmlFor="string-qty-12">12</label>
      </div>
    </div>
    <div className="add-item__form-right">
      <div className="custom-input add-item__form-input">
        <label><span>Дата добавления товара</span>
          <input type="text" name="date" value="" placeholder="Дата в формате 00.00.0000" readOnly />
        </label>
        <p>Заполните поле</p>
      </div>
      <div className="custom-input add-item__form-input">
        <label><span>Введите наименование товара</span>
          <input type="text" name="title" value="" placeholder="Наименование" />
        </label>
        <p>Заполните поле</p>
      </div>
      <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
        <label><span>Введите цену товара</span>
          <input type="text" name="price" value="" placeholder="Цена в формате 00 000" />
        </label>
        <p>Заполните поле</p>
      </div>
      <div className="custom-input add-item__form-input">
        <label><span>Введите артикул товара</span>
          <input type="text" name="sku" value="" placeholder="Артикул товара" />
        </label>
        <p>Заполните поле</p>
      </div>
      <div className="custom-textarea add-item__form-textarea">
        <label><span>Введите описание товара</span>
          <textarea name="description" placeholder=""></textarea>
        </label>
        <p>Заполните поле</p>
      </div>
    </div>
    <div className="add-item__form-buttons-wrap">
      <button className="button button--small add-item__form-button" type="submit">Сохранить изменения</button>
      <button className="button button--small add-item__form-button" type="button">Вернуться к списку товаров</button>
    </div>
  </form>);
//!};

export default ProductForm;
