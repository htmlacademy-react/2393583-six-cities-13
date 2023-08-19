import PlaceCard from '../place-card/place-card';
import { Offer } from '../../types/offer';

type PlaceCardListProps = {
    offers: Offer[];
    onPlaceCardHover: (offer: Offer) => void;
}

function PlaceCardList({offers, onPlaceCardHover}: PlaceCardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} onCardHover={onPlaceCardHover} />)}
    </div>
  );
}

export default PlaceCardList;
