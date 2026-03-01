import { createSlice } from "@reduxjs/toolkit";
import type { WishlistState } from "../types/wishlist.types";
import {
  fetchWishlist,
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "./wishlist.thunks";

/* ═══════════════════════════════════════════════════════════════════════════
   wishlist.slice.ts
   Pure Redux logic — no Axios, no UI side-effects.
   ═══════════════════════════════════════════════════════════════════════════ */

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
  pendingActions: {},
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist(state) {
      state.items = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* ── fetchWishlist ─────────────────────────────────────────────────── */
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.loading = false;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });

    /* ── addToWishlist ─────────────────────────────────────────────────── */
    builder
      .addCase(addToWishlistThunk.pending, (state, action) => {
        state.pendingActions[action.meta.arg] = true;
      })
      .addCase(addToWishlistThunk.fulfilled, (state, action) => {
        delete state.pendingActions[action.meta.arg];
        state.items = action.payload.items;
      })
      .addCase(addToWishlistThunk.rejected, (state, action) => {
        delete state.pendingActions[action.meta.arg];
        state.error = action.payload ?? "Unknown error";
      });

    /* ── removeFromWishlist ────────────────────────────────────────────── */
    builder
      .addCase(removeFromWishlistThunk.pending, (state, action) => {
        state.pendingActions[action.meta.arg] = true;
      })
      .addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
        delete state.pendingActions[action.meta.arg];
        state.items = action.payload.items;
      })
      .addCase(removeFromWishlistThunk.rejected, (state, action) => {
        delete state.pendingActions[action.meta.arg];
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;

export const wishlistReducer = wishlistSlice.reducer;
