import { configureStore } from '@reduxjs/toolkit';

import { createAPI } from '../api';
import { rootReducer } from './root-reducer';
import { fetchUserStatus } from './action';
import history from '../history';

const api = createAPI();
const thunk = { extraArgument: { api, history } };
const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk })
  }
);

store.dispatch(fetchUserStatus());

export default store;
