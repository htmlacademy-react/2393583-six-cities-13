import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { Offer } from '../../types/offer';
import { CITIES } from '../../const';
import { useState } from 'react';

type WelcomeScreenProps = {
    offers: Offer[];
    cities: typeof CITIES;
}

function WelcomeScreen({offers, cities}: WelcomeScreenProps): JSX.Element {
  const city = useAppSelector((state) => state.city);

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const handlePlaceCardHover = (point: Offer) => {
    const currentPoint = offers.find((offer) => offer.id === point.id);

    setSelectedOffer(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Шесть городов. Главная страница</title>
      </Helmet>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={cities} offers={offers} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in {city}</b>
              <PlaceCardList offers={currentOffers} onPlaceCardHover={handlePlaceCardHover}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={currentOffers} selectedOffer={selectedOffer} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomeScreen;
