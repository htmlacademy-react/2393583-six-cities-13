import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer, OfferCard } from '../types/offer';
import { APIRoute, AppRoute } from '../const';
import { redirectToRoute } from './action';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Review, RequestComment } from '../types/review';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferByIdAction = createAsyncThunk<OfferCard, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOfferById',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferCard>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offer[], string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchNearbyOffers',
    async (offerId, {extra: api}) => {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      return data;
    },
  );

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchReviews',
    async (offerId, {extra: api}) => {
      const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
      return data;
    },
  );

export const fetchSendReviewAction = createAsyncThunk<RequestComment | null, {rating: number; comment: FormDataEntryValue; id: string}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchSendComment',
    async ({rating, comment, id}, {dispatch, extra: api}) => {
      const {data} = await api.post<RequestComment>(`${APIRoute.Comments}/${id}`, {rating, comment});
      dispatch(fetchReviewsAction(id));
      return data;
    },
  );

export const fetchFavoritesAction = createAsyncThunk<Offer[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchFavorites',
    async (_arg, {extra: api}) => {
      const {data} = await api.get<Offer[]>(APIRoute.Favorite);
      return data;
    },
  );

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (login, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, login);
    saveToken(data.token);
    // saveUserEmail(data.email);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {
    extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  //dropUserEmail();
  },
);

export const fetchChangeStatusFavoriteAction = createAsyncThunk<Offer, {status: number; id: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchChangeStatusFavorite',
  async ({status, id}, {extra: api}) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${status}`);
    return data;
  },
);
