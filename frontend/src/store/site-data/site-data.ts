import { createSlice } from '@reduxjs/toolkit';

import { fetchProducts, fetchProduct, postOffer, editOffer } from '../action';
import type { SiteData } from '../../types/state';
import { StoreSlice } from '../../const';

const initialState: SiteData = {
  productsWithPagination: null,
  isProductsLoading: false,
  product: null,
  isProductLoading: false,
};

export const siteData = createSlice({
  name: StoreSlice.SiteData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsWithPagination = action.payload;
        state.isProductsLoading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isProductsLoading = false;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isProductLoading = false;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isProductLoading = false;
      })
      .addCase(postOffer.fulfilled, (_state, action) => {
        // eslint-disable-next-line no-console
        console.log(action.payload);
        //state.offers.push(action.payload);
      })
      .addCase(editOffer.fulfilled, (_state, action) => {
        //!
        const updatedOffer = action.payload;
        // eslint-disable-next-line no-console
        console.log(updatedOffer);
        //!state.offers = state.offers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
      });
  }
});
