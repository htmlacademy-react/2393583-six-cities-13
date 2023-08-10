import Logo from '../../components/logo/logo';
import User from '../../components/user/user';
import Sign from '../../components/sign/sign';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import CitiesList from '../../components/cities-list/cities-list';

type WelcomeScreenProps = {
    cities: string[];
    offers: Offer[];
}

function WelcomeScreen({offers, cities}: WelcomeScreenProps): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const currentOffers = offers.filter((offer) => offer.city.name === city);


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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <PlaceCardList offers={currentOffers}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={currentOffers} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomeScreen;
