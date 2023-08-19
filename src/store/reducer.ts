import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersList, changeSortingType } from './action';
import { Offer } from '../types/offer';
import { SortingType } from '../const';

const FIRST_CITY = 'Paris';
const FIRST_SORT = SortingType.Popular;

type InitialStateType = {
  city: string;
  offers: Offer[];
  sortingType: SortingType;
}

const initialState: InitialStateType = {
  city: FIRST_CITY,
  offers: [],
  sortingType: FIRST_SORT,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(changeSortingType, (state, action) => {
      state.sortingType = action.payload.type;
    });
});

export { reducer };
