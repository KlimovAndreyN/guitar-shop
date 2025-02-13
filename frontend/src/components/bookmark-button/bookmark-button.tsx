import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postOfferFavoriteAction } from '../../store/api-actions';
import { OfferId } from '../../types/offer';
import { AppRoute, AuthorizationStatus, BookmarkButtonIconSize, ClassNamePrefix } from '../../const';

type BookmarkButtonProps = {
  offerId: OfferId;
  classNamePrefix: ClassNamePrefix;
  isBigButton?: boolean;
  isActive: boolean;
}

function BookmarkButton({ offerId, classNamePrefix, isBigButton = false, isActive }: BookmarkButtonProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const className = `${classNamePrefix}__bookmark`;
  const buttonMainClassName = `${className}-button`;
  const iconClassName = `${className}-icon`;
  const activeButtonClassName = `${buttonMainClassName}--active`;
  const buttonClassName = classNames(
    'button',
    buttonMainClassName,
    { [activeButtonClassName]: isActive }
  );
  const { width, height } = (isBigButton) ? BookmarkButtonIconSize.BIG : BookmarkButtonIconSize.SMALL;

  const handleButtonClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    } else {
      const id = offerId;
      const status = !isActive;

      dispatch(postOfferFavoriteAction({ id, status }));
    }
  };

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={handleButtonClick}
    >
      <svg className={iconClassName} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isActive ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
