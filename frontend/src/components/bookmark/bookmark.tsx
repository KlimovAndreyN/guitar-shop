import { useAppSelector } from '../../hooks';
import { getIsAuthorized } from '../../store/user-process/selectors';

type BookmarkProps = {

  isActive: boolean;
  place?: 'place-card' | 'property'
}

const Bookmark = ({ isActive, place = 'place-card' }: BookmarkProps) => {
  const isAuthorized = useAppSelector(getIsAuthorized);

  return (
    <button
      className={`${place}__bookmark-button button${(isActive && isAuthorized) ? ` ${place}__bookmark-button--active` : ''
        }`}
      type="button"
    >
      <svg className="place-card__bookmark-icon" width={place === 'property' ? 31 : 18} height={place === 'property' ? 33 : 19}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{(isActive && isAuthorized) ? 'From' : 'To'} bookmarks</span>
    </button>
  );
};

export default Bookmark;
