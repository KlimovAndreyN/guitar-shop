import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NotFoundPage from '../not-found-page/not-found-page';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import Header from '../../components/header/header';
import OfferInfo from '../../components/offer-info/offer-info';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadDetailOffer, loadOfferNearOffers, loadOfferReviews } from '../../store/action';
import { fetchDetailOfferAction, fetchOfferNearOffersAction, fetchOfferReviewsAction } from '../../store/api-actions';
import { OfferId } from '../../types/offer';
import { PageTitle, EMPTY_DETAIL_OFFER } from '../../const';

function OfferPage(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  useScrollToTop();

  const offerId: OfferId = params.id;

  useEffect(() => {
    dispatch(loadDetailOffer({ ...EMPTY_DETAIL_OFFER, id: offerId }));
    dispatch(loadOfferNearOffers([]));
    dispatch(loadOfferReviews([]));

    dispatch(fetchDetailOfferAction(offerId));
    dispatch(fetchOfferNearOffersAction(offerId));
    dispatch(fetchOfferReviewsAction(offerId));
  }, [dispatch, offerId]);

  const detailOffer = useAppSelector((state) => state.detailOffer);

  if (!offerId || !detailOffer.id) {
    return <NotFoundPage />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>{PageTitle.Offer}</title>
      </Helmet>
      <Header />
      <OfferInfo />
    </div>
  );
}

export default OfferPage;
