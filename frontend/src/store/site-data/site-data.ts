import { createSlice } from '@reduxjs/toolkit';

import { fetchOffers, fetchOffer, fetchPremiumOffers, fetchComments, postComment, postOffer, editOffer, fetchProcuts, fetchProduct } from '../action';
import type { SiteData } from '../../types/state';
import { StoreSlice, SubmitStatus } from '../../const';

const initialState: SiteData = {
  productsWithPagination: null,
  isProductsLoading: false,
  product: null,
  isProductLoading: false,

  offers: [],
  isOffersLoading: false,
  offer: null,
  isOfferLoading: false,
  favoriteOffers: [],
  isFavoriteOffersLoading: false,
  premiumOffers: [],
  comments: [],
  commentStatus: SubmitStatus.Still
};

export const siteData = createSlice({
  name: StoreSlice.SiteData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProcuts.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(fetchProcuts.fulfilled, (state, action) => {
        state.productsWithPagination = action.payload;
        state.isProductsLoading = false;
      })
      .addCase(fetchProcuts.rejected, (state) => {
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


      .addCase(fetchOffers.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.isOfferLoading = false;
      })
      .addCase(postOffer.fulfilled, (state, action) => {
        state.offers.push(action.payload);
      })
      .addCase(editOffer.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
        state.favoriteOffers = state.favoriteOffers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
        state.premiumOffers = state.premiumOffers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
      })
      .addCase(fetchPremiumOffers.fulfilled, (state, action) => {
        state.premiumOffers = action.payload;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postComment.pending, (state) => {
        state.commentStatus = SubmitStatus.Pending;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.commentStatus = SubmitStatus.Fullfilled;
      })
      .addCase(postComment.rejected, (state) => {
        state.commentStatus = SubmitStatus.Rejected;
      });
  }
});
