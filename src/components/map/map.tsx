import { Icon, Marker, layerGroup } from 'leaflet';
import './map.css';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { Offer } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';

type MapProps = {
    offers: Offer[];
    selectOffer: Offer | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT as string,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({offers, selectOffer}: MapProps): JSX.Element {
  const cityLocation = offers[0].city.location;

  const mapRef = useRef(null);
  const map = useMap({mapRef, cityLocation});

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: cityLocation.latitude,
          lng: cityLocation.longitude,
        },
        cityLocation.zoom,
      );
    }
  }, [map, cityLocation]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        marker
          .setIcon(selectOffer !== undefined && offer.id === selectOffer.id
            ? currentCustomIcon
            : defaultCustomIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectOffer]);

  return (
    <div ref={mapRef} ></div>
  );
}

export default Map;
