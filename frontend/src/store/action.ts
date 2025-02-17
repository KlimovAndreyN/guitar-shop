import type { History } from 'history';
import type { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { TokenStore } from '../utils/token-store';
import { DetailProduct, ProductsWithPagination, Token } from '../types/backend';
import type { UserAuth, User, UserRegister, ProductDto, UserLogin } from '../types/types';
import { ApiRoute, AppRoute, HttpCode } from '../const';

type Extra = {
  api: AxiosInstance;
  history: History;
};

export const Action = {
  FETCH_PRODUCTS: 'products/fetch',
  FETCH_PRODUCT: 'product/fetch',
  POST_PRODUCT: 'product/post-product',
  EDIT_PRODUCT: 'product/edit-product',
  DELETE_PRODUCT: 'product/delete-product',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  REGISTER_USER: 'user/register',
};

export const fetchProducts = createAsyncThunk<ProductsWithPagination, string, { extra: Extra }>(
  Action.FETCH_PRODUCTS,
  //! временно
  async (query, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<ProductsWithPagination>(ApiRoute.Products + query);

    return data;
  }
);

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
  }
);

export const postProduct = createAsyncThunk<DetailProduct, ProductDto, { extra: Extra }>(
  Action.POST_PRODUCT,
  async (productDto, { extra }) => {
    const { api, history } = extra;
    const formData = new FormData();
    const fileKeyName = 'imageFile';
    const imageFile = productDto[fileKeyName];

    //! тест
    for (const [key, value] of Object.entries(productDto)) {
      if (key !== fileKeyName) {
        formData.append(key, value as string);
      }
    }

    if (imageFile) {
      formData.append(fileKeyName, imageFile);
    }
    //

    const { data } = await api.post<DetailProduct>(ApiRoute.Products, formData);

    history.push(`${AppRoute.Product}/${data.id}`);

    return data;
  }
);

export const editProduct = createAsyncThunk<DetailProduct, ProductDto, { extra: Extra }>(
  Action.EDIT_PRODUCT,
  async (productDto, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.put<DetailProduct>(`${ApiRoute.Products}/${productDto.id}`, productDto);

    history.push(`${AppRoute.Product}/${data.id}`);

    return data;
  }
);

export const deleteProduct = createAsyncThunk<void, string, { extra: Extra }>(
  Action.DELETE_PRODUCT,
  async (id, { extra }) => {
    const { api } = extra;

    await api.delete(`${ApiRoute.Products}/${id}`);
  }
);

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
  }
);

export const loginUser = createAsyncThunk<UserAuth['name'], UserLogin, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ login, password }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<User & Token>(ApiRoute.Login, { login, password });
    const { accessToken, name } = data;

    TokenStore.save(accessToken);
    history.push(AppRoute.Catalog);

    return name;
  }
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async () => {
    TokenStore.drop();
  }
);

export const registerUser = createAsyncThunk<void, UserRegister, { extra: Extra }>(
  Action.REGISTER_USER,
  async ({ email, password, name }, { extra }) => {
    const { api, history } = extra;
    const user = { email, password, name };

    await api.post<{ id: string }>(ApiRoute.Register, user);

    history.push(AppRoute.Root);
  }
);
