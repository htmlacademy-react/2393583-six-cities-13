import Logo from '../../components/logo/logo';
import User from '../../components/user/user';
import Sign from '../../components/sign/sign';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import CitiesList from '../../components/cities-list/cities-list';
import { sorting } from '../../ultils';
import { CITIES } from '../../const';
import SortingOptions from '../../components/sorting-options/sorting-options';

type WelcomeScreenProps = {
    cities: typeof CITIES;
    offers: Offer[];
}

function WelcomeScreen({offers, cities}: WelcomeScreenProps): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const sortingType = useAppSelector((state) => state.sortingType);
  const currentOffers = sorting[sortingType](offers.filter((offer) => offer.city.name === city));

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
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <User />
                <Sign />
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
              <SortingOptions />
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
