import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer } from '../types/offer';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR, AppRoute} from '../const';
import {
  fillOffersList,
  loadingFavorites,
  requirementAuthorization,
  setError,
  setOffersDataLoadingStatus,
  redirectToRoute
} from './action';
import { dropToken, saveToken } from '../services/token';
import { store } from '.';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  }
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }>(
      'fetchOffers',
      async (_arg, {dispatch, extra: api}) => {
        dispatch(setOffersDataLoadingStatus(true));
        const {data} = await api.get<Offer[]>(APIRoute.Offers);
        dispatch(setOffersDataLoadingStatus(false));
        dispatch(fillOffersList({offers: data}));
      },
    );

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }>(
      'fetchFavorites',
      async (_arg, {dispatch, extra: api}) => {
        dispatch(setOffersDataLoadingStatus(true));
        const {data} = await api.get<Offer[]>(APIRoute.Faforite);
        dispatch(setOffersDataLoadingStatus(false));
        dispatch(loadingFavorites({favorites: data}));
      },
    );

export const checkAuthAction = createAsyncThunk<void, undefined, {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
  }>(
    'user/checkAuth',
    async (_arg, {dispatch, extra: api}) => {
      try {
        await api.get(APIRoute.Login);
        dispatch(requirementAuthorization(AuthorizationStatus.Auth));
      } catch {
        dispatch(requirementAuthorization(AuthorizationStatus.NoAuth));
      }
    },
  );

export const loginAction = createAsyncThunk<void, AuthData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/login',
    async ({login: email, password}, {dispatch, extra: api}) => {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(redirectToRoute(AppRoute.Main));
    },
  );

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requirementAuthorization(AuthorizationStatus.NoAuth));
  },
);
