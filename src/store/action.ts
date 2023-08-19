import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { SortingType } from '../const';

export const changeCity = createAction<{city: string}>('changeCity');
export const fillOffersList = createAction<{offers: Offer[]}>('fillOffersList');
export const changeSortingType = createAction<{type: SortingType}>('changeSortingType');
