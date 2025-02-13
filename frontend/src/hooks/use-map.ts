import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '../types';
import { Leaflet } from '../const';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  startLocation: Location
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(
    () => {
      const { latitude: lat, longitude: lng, zoom } = startLocation;
      const center = { lat, lng };

      if (mapRef.current && !isRenderedRef.current) {
        const { URL_TEMPLATE, OPTIONS } = Leaflet;

        const instance = new Map(mapRef.current, { center, zoom });
        const layer = new TileLayer(URL_TEMPLATE, OPTIONS);

        instance.addLayer(layer);
        setMap(instance);
        isRenderedRef.current = true;
      } else {
        map?.setView(center, zoom);
      }
    },
    [map, mapRef, startLocation]
  );

  return map;
}

export default useMap;
