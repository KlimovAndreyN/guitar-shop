import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { DetailOffer, Offers } from '../../types/offer';
import { Location } from '../../types';
import { ClassNamePrefix, UrlMarker, IconMarkerSize, IconAnchorSize } from '../../const';
import { useAppSelector } from '../../hooks';

type OffersMapProps = {
  classNamePrefix: ClassNamePrefix;
  startLocation: Location;
  offers: Offers;
  activeDetailOffer?: DetailOffer;
}

const defaultCustomIcon = new Icon({
  iconUrl: UrlMarker.DEFAULT,
  iconSize: [IconMarkerSize.WIDTH, IconMarkerSize.HEIGHT],
  iconAnchor: [IconAnchorSize.WIDTH, IconAnchorSize.HEIGHT]
});

const currentCustomIcon = new Icon({
  iconUrl: UrlMarker.CURRENT,
  iconSize: [IconMarkerSize.WIDTH, IconMarkerSize.HEIGHT],
  iconAnchor: [IconAnchorSize.WIDTH, IconAnchorSize.HEIGHT]
});

function OffersMap(props: OffersMapProps): JSX.Element {
  const {
    classNamePrefix,
    startLocation,
    offers,
    //activeOfferId = null,
    activeDetailOffer = null
  } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, startLocation);
  const activeOfferId = useAppSelector((state) => state.activeOfferId);

  useEffect(
    () => {
      if (map) {
        const markerLayer = layerGroup().addTo(map);

        offers.forEach((offer) => {
          const { latitude: lat, longitude: lng } = offer.location;
          const customIcon = (offer.id === activeOfferId) ? currentCustomIcon : defaultCustomIcon;
          const marker = new Marker({ lat, lng });

          marker.setIcon(customIcon).addTo(markerLayer);
        });

        if (activeDetailOffer) {
          const { latitude: lat, longitude: lng } = activeDetailOffer.location;
          const marker = new Marker({ lat, lng });

          marker.setIcon(currentCustomIcon).addTo(markerLayer);
        }

        return () => {
          map.removeLayer(markerLayer);
        };
      }
    },
    [map, offers, activeOfferId, activeDetailOffer]);

  return (
    <section className={`${classNamePrefix}__map map`} ref={mapRef} />
  );
}

export default OffersMap;
