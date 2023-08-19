export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favotites = '/favorites',
  Offer = '/offer/:id',
}
export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
export const URL_MARKER_DEFAULT = 'markup/img/pin.svg';
export const URL_MARKER_CURRENT = 'markup/img/pin-active.svg';

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const DateFormat = {
  DATE_FORMAT: 'YYYY-MM-DD',
  REVIEW_DATE_FORMAT: 'MMMM YYYY',
};

export enum SortingType {
  Popular = 'Popular',
  PriceLow = 'Price: low to high',
  PriceHigh = 'Price: high to low',
  TopRated = 'Top rated first',
}

