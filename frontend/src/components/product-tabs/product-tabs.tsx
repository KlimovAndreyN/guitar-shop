import { MouseEvent, useState } from 'react';
import classNames from 'classnames';

import { GuitarTypeTitle, GuitarType, StringsCount } from '../../const';

enum TabOption {
  Characteristics = 'characteristics',
  Description = 'description'
}

const isCharacteristicsTab = (value: TabOption) => (value === TabOption.Characteristics);
const isDescriptionTab = (value: TabOption) => (value === TabOption.Description);

type ProductTabsProps = {
  description: string;
  guitarType: GuitarType;
  article: string;
  stringsCount: StringsCount;
}

const ProductTabs = ({ description, guitarType, article, stringsCount }: ProductTabsProps): JSX.Element => {
  const guitarTypeTitle = GuitarTypeTitle[guitarType];
  const openedTab = TabOption.Characteristics;
  const [chosenOpenedTab, setOpenedTab] = useState(openedTab);
  const isOpenedDescriptionTab = isDescriptionTab(chosenOpenedTab);
  const characteristicsTableClassName = classNames('tabs__table', { 'hidden': isOpenedDescriptionTab });
  const descriptionTableClassName = classNames('tabs__product-description', { 'hidden': !isOpenedDescriptionTab });
  const characteristicsButtonClassName = classNames('button button--medium tabs__button', { 'button--black-border  ': isOpenedDescriptionTab });
  const descriptionButtonClassName = classNames('button button--medium tabs__button', { 'button--black-border  ': !isOpenedDescriptionTab });

  const handleCharacteristicsClick = (event: MouseEvent) => {
    event.preventDefault();

    if (isDescriptionTab(chosenOpenedTab)) {
      setOpenedTab(TabOption.Characteristics);
    }
  };

  const handleDescriptionClick = (event: MouseEvent) => {
    event.preventDefault();

    if (isCharacteristicsTab(chosenOpenedTab)) {
      setOpenedTab(TabOption.Description);
    }
  };

  return (
    <div className="tabs">
      <a className={characteristicsButtonClassName} /*href="#characteristics"*/ onClick={handleCharacteristicsClick}>Характеристики</a>
      <a className={descriptionButtonClassName} /*href="#description"*/ onClick={handleDescriptionClick}>Описание</a>
      <div className="tabs__content" id="characteristics">
        <table className={characteristicsTableClassName}>
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
        <p className={descriptionTableClassName}>{description}</p>
      </div>
    </div>
  );
};

export default ProductTabs;
