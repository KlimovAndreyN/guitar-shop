import { CityName } from '../types';
import { OffersByCityName, Offer, Offers, DetailOffer, BaseOffer } from '../types/offer';
import { OfferSortigType } from '../const';

function getCityOffers(cityName: CityName, offers: Offers) {
  return offers.filter(({ city }) => (cityName === city.name));
}

const compareOffers = {
  [OfferSortigType.PriceLowToHigh]: ({ price: firstPrice }: Offer, { price: secondPrice }: Offer) => (firstPrice - secondPrice),
  [OfferSortigType.PriceHighToLow]: ({ price: firstPrice }: Offer, { price: secondPrice }: Offer) => (secondPrice - firstPrice),
  [OfferSortigType.TopRatedFirst]: ({ rating: firstRating }: Offer, { rating: secondRating }: Offer) => (secondRating - firstRating)
};

function sortOffers(offers: Offers, offerSortingType: OfferSortigType): Offers {
  if (offerSortingType === OfferSortigType.Popular) {
    return offers;
  }

  return [...offers].sort(compareOffers[offerSortingType]);
}

function getOffersByCityName(offers: Offers): OffersByCityName[] {
  const offersByCityNames: OffersByCityName[] = [];

  offers.forEach((offer) => {
    const offersByCityName = offersByCityNames.find(({ cityName }) => (cityName === offer.city.name));

    if (!offersByCityName) {
      offersByCityNames.push({ cityName: offer.city.name, offers: [offer] });
    } else {
      offersByCityName.offers.push(offer);
    }
  });

  return offersByCityNames;
}

function getFavoriteOffersCount(offers: Offer[]): number {
  return offers.filter(({ isFavorite }) => isFavorite).length;
}

function convertDetailOfferToOffer(offer: Offer, detailOffer: DetailOffer): Offer {
  const { previewImage } = offer;
  const newBaseOffer: BaseOffer = detailOffer;
  const newOffer: Offer = { ...newBaseOffer, previewImage };

  return newOffer;
}

function updateOffers(offers: Offer[], detailOffer: DetailOffer): void {
  const offerIndex = offers.findIndex(({ id }) => (id === detailOffer.id));
  if (offerIndex > -1) {
    const offer = offers[offerIndex];
    offers[offerIndex] = convertDetailOfferToOffer(offer, detailOffer);
  }
}

export { getCityOffers, sortOffers, getOffersByCityName, getFavoriteOffersCount, updateOffers };
