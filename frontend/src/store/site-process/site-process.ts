import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { SiteProcess } from '../../types/state';
import type { SortName } from '../../types/types';
import { Sorting, StoreSlice } from '../../const';

const initialState: SiteProcess = {
  page: 1,
  sorting: Sorting.Popular,
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
    }
  }
});

export const { setPage, setSorting } = siteProcess.actions;
