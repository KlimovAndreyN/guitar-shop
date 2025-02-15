import { MouseEvent, useState } from 'react';
import classNames from 'classnames';

import { GuitarType } from '../../types/backend';
import { GuitarTypeTitle } from '../../const';

type ProductTabsProps = {
  description: string;
  guitarType: GuitarType;
  article: string;
  stringsCount: number;
}

const ProductTabs = ({ description, guitarType, article, stringsCount }: ProductTabsProps): JSX.Element => {
  const guitarTypeTitle = GuitarTypeTitle[guitarType];
  const startIsShowDescription = false;
  const [isShowDescription, setIsShowDescription] = useState(startIsShowDescription);

  const characteristicsClassName = classNames('tabs__table', { 'hidden': isShowDescription });
  const descriptionClassName = classNames('tabs__product-description', { 'hidden': !isShowDescription });

  const handleCharacteristicsClick = (event: MouseEvent) => {
    event.preventDefault();

    if (isShowDescription) {
      setIsShowDescription(!isShowDescription);
    }
  };

  const handleDescriptionClick = (event: MouseEvent) => {
    event.preventDefault();

    if (!isShowDescription) {
      setIsShowDescription(!isShowDescription);
    }
  };

  return (
    <div className="tabs">
      <a className="button button--medium tabs__button" /*href="#characteristics"*/ onClick={handleCharacteristicsClick}>Характеристики</a>
      <a className="button button--black-border button--medium tabs__button" /*href="#description"*/ onClick={handleDescriptionClick}>Описание</a>
      <div className="tabs__content" id="characteristics">
        <table className={characteristicsClassName}>
          <tbody>
            <tr className="tabs__table-row">
              <td className="tabs__title">Артикул:</td>
              <td className="tabs__value">{article}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Тип:</td>
              <td className="tabs__value">{guitarTypeTitle}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Количество струн:</td>
              <td className="tabs__value">{stringsCount} струнная</td>
            </tr>
          </tbody>
        </table>
        <p className={descriptionClassName}>{description}</p>
      </div>
    </div>
  );
};

export default ProductTabs;
