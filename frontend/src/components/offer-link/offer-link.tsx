import { Link } from 'react-router-dom';
import { OfferId } from '../../types/offer';
import { OFFER_BASE_ROUTE } from '../../const';

type OfferLinkProps = {
  offerId: OfferId;
  children: string | JSX.Element;
}

function OfferLink({ offerId, children }: OfferLinkProps): JSX.Element {
  return (
    <Link to={`${OFFER_BASE_ROUTE}${offerId}`}>
      {children}
    </Link>
  );
}

export default OfferLink;
