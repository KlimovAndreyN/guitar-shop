import classNames from 'classnames';
import { User } from '../../types';

type OfferHostProps = {
  host: User;
  description: string;
}

function OfferHost({ host, description }: OfferHostProps): JSX.Element {
  const { name, isPro, avatarUrl } = host;
  const divClassName = classNames(
    'offer__avatar-wrapper',
    'user__avatar-wrapper',
    { 'offer__avatar-wrapper--pro': isPro }
  );

  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className={divClassName}>
          <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="offer__user-name">
          {name}
        </span>
        {isPro ? <span className="offer__user-status">Pro</span> : null}
      </div>
      <div className="offer__description">
        <p className="offer__text">
          {description}
        </p>
      </div>
    </div>
  );
}

export default OfferHost;
