import { NameSpace } from '../../const';
import { Offer, OfferCard } from '../../types/offer';
import { RequestComment, Review } from '../../types/review';
import { State } from '../../types/state';

export const getOfferById = (state: State): OfferCard => state[NameSpace.OfferById].offer;
export const getOfferDataLoadingStatus = (state: State): boolean => state[NameSpace.OfferById].isOfferDataLoading;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.OfferById].nearbyOffers;
export const getComments = (state: State): Review[] => state[NameSpace.OfferById].comments;
export const sendComment = (state: State): RequestComment => state[NameSpace.OfferById].comment;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Offers].hasError;
