import type { History } from 'history';
import type { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { UserAuth, User, UserRegister, NewOffer } from '../types/types';
import { ApiRoute, AppRoute, HttpCode } from '../const';
import { TokenStore } from '../utils/token-store';
import { DetailProduct, ProductsWithPagination, Token } from '../types/backend';

type Extra = {
  api: AxiosInstance;
  history: History;
};

//! временно
type Offer = {
  id: string;
};

export const Action = {
  FETCH_PRODUCTS: 'products/fetch',
  FETCH_PRODUCT: 'product/fetch',

  POST_OFFER: 'offer/post-offer',
  EDIT_OFFER: 'offer/edit-offer',
  DELETE_OFFER: 'offer/delete-offer',

  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  REGISTER_USER: 'user/register',
};

export const fetchProducts = createAsyncThunk<ProductsWithPagination, undefined, { extra: Extra }>(
  Action.FETCH_PRODUCTS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<ProductsWithPagination>(ApiRoute.Products);

    return data;
  });

export const fetchProduct = createAsyncThunk<DetailProduct, DetailProduct['id'], { extra: Extra }>(
  Action.FETCH_PRODUCT,
  async (id, { extra }) => {
    const { api, history } = extra;

    try {
      const { data } = await api.get<DetailProduct>(`${ApiRoute.Products}/${id}`);

      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NotFound) {
        history.push(AppRoute.NotFound);
      }

      return Promise.reject(error);
    }
  });

export const postOffer = createAsyncThunk<Offer, NewOffer, { extra: Extra }>(
  Action.POST_OFFER,
  async (newOffer, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<Offer>(ApiRoute.Offers, newOffer);
    history.push(`${AppRoute.Product}/${data.id}`);

    return data;
  });

export const editOffer = createAsyncThunk<Offer, Offer, { extra: Extra }>(
  Action.EDIT_OFFER,
  async (offer, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.patch<Offer>(`${ApiRoute.Offers}/${offer.id}`, offer);
    history.push(`${AppRoute.Product}/${data.id}`);

    return data;
  });

export const deleteOffer = createAsyncThunk<void, string, { extra: Extra }>(
  Action.DELETE_OFFER,
  async (id, { extra }) => {
    const { api, history } = extra;
    await api.delete(`${ApiRoute.Offers}/${id}`);
    history.push(AppRoute.Root);
  });

export const fetchUserStatus = createAsyncThunk<UserAuth['name'], undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra }) => {
    const { api } = extra;

    try {
      const { data } = await api.get<User>(ApiRoute.Check);

      return data.name;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NoAuth) {
        TokenStore.drop();
      }

      return Promise.reject(error);
    }
  });

export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ email: login, password }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<User & Token>(ApiRoute.Login, { login, password });
    const { accessToken } = data;

    TokenStore.save(accessToken);
    history.push(AppRoute.Catalog);

    return login;
  });

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async () => {
    TokenStore.drop();
  });

export const registerUser = createAsyncThunk<void, UserRegister, { extra: Extra }>(
  Action.REGISTER_USER,
  async ({ email, password, name }, { extra }) => {
    const { api, history } = extra;
    await api.post<{ id: string }>(
      ApiRoute.Register,
      {
        email,
        password,
        name
      }
    );

    history.push(AppRoute.Root);
  });
