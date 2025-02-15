import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { SiteProcess } from '../../types/state';
import type { CityName, SortName } from '../../types/types';
import { CITIES, CityLocation, Sorting, StoreSlice } from '../../const';

const initialState: SiteProcess = {
  page: 1,
  sorting: Sorting.Popular,
  city: {
    name: CITIES[0],
    location: CityLocation[CITIES[0]],
  }
};

export const siteProcess = createSlice({
  name: StoreSlice.SiteProcess,
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSorting: (state, action: PayloadAction<SortName>) => {
      state.sorting = action.payload;
    },

    setCity: (state, action: PayloadAction<CityName>) => {
      state.city = {
        name: action.payload,
        location: CityLocation[action.payload],
      };
    }
  }
});

export const { setCity, setSorting } = siteProcess.actions;
