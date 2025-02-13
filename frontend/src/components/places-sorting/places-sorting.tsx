import { useState } from 'react';
import classNames from 'classnames';
import { OfferSortigType } from '../../const';

type PlacesSortingProps = {
  currentOfferSortType: OfferSortigType;
  onSortingTypeChange: (sortingType: OfferSortigType) => void;
}

function PlacesSorting({ currentOfferSortType, onSortingTypeChange }: PlacesSortingProps): JSX.Element {
  const [isSortingTypesShown, setIsSortingTypesShown] = useState<boolean>(false);
  const listClassName = classNames(
    'places__options',
    'places__options--custom',
    { 'places__options--opened': isSortingTypesShown }
  );

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={
          () => {
            setIsSortingTypesShown(!isSortingTypesShown);
          }
        }
      >
        {currentOfferSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={listClassName}>
        {
          Object.values(OfferSortigType).map(
            (sortingType: OfferSortigType) => {
              const itemClassName = classNames(
                'places__option',
                { 'places__option--active': sortingType === currentOfferSortType }
              );

              return (
                <li
                  key={sortingType}
                  className={itemClassName}
                  tabIndex={0}
                  onClick={
                    () => {
                      setIsSortingTypesShown(false);
                      onSortingTypeChange(sortingType);
                    }
                  }
                >
                  {sortingType}
                </li>
              );
            }
          )
        }
      </ul>
    </form>
  );
}

export default PlacesSorting;
