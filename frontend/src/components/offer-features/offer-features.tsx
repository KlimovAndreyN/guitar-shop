import { addPluralEnding, upFirstLetter } from '../../utils/common';
import { OfferFeatureType } from '../../const';

type OfferFeaturesProps = {
  offerType: string;
  bedrooms: number;
  maxAdults: number;
}

function OfferFeatures({ offerType, bedrooms, maxAdults }: OfferFeaturesProps): JSX.Element {
  const features = [
    { type: OfferFeatureType.Entire, text: upFirstLetter(offerType) },
    { type: OfferFeatureType.Bedrooms, text: `${bedrooms} ${addPluralEnding('Bedroom', bedrooms)}` },
    { type: OfferFeatureType.Adults, text: `Max ${maxAdults} ${addPluralEnding('adult', maxAdults)}` }
  ];

  return (
    <ul className="offer__features">
      {
        features.map(({ type, text }) => (
          <li key={type} className={`offer__feature offer__feature--${type}`}>
            {text}
          </li>
        ))
      }
    </ul>
  );
}

export default OfferFeatures;
