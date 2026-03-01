import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "../types/cart.types";
import {
  fetchCart,
  addToCartThunk,
  removeFromCartThunk,
  updateQuantityThunk,
  mergeGuestCartThunk,
  clearCartThunk,
} from "./cart.thunks";

/* ═══════════════════════════════════════════════════════════════════════════
   cart.slice.ts
   Pure Redux logic — no Axios, no localStorage, no UI side-effects.
   ═══════════════════════════════════════════════════════════════════════════ */

const initialState: CartState = {
  mode: "guest",
  cartId: null,
  items: [],
  total: 0,
  numOfCartItems: 0,
  loading: false,
  error: null,
  initialized: false,
  pendingActions: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartMode(state, action: PayloadAction<"auth" | "guest">) {
      state.mode = action.payload;
    },

    setGuestCartItems(
      state,
      action: PayloadAction<{ items: CartItem[]; total: number }>,
    ) {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.numOfCartItems = action.payload.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.initialized = true;
      state.loading = false;
    },

    clearCart(state) {
      state.cartId = null;
      state.items = [];
      state.total = 0;
      state.numOfCartItems = 0;
      state.error = null;
    },

    resetCartInitialized(state) {
      state.initialized = false;
    },
  },

  extraReducers: (builder) => {
    /* ── fetchCart ─────────────────────────────────────────────────────── */
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartId = action.payload.cartId;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.loading = false;
        state.initialized = true;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
        state.initialized = true;
      });

    /* ── addToCart ─────────────────────────────────────────────────────── */
    builder
      .addCase(addToCartThunk.pending, (state, action) => {
        state.pendingActions[action.meta.arg] = true;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        delete state.pendingActions[action.meta.arg];
        // Optimistic badge + total update from the unpopulated response.
        // Full items are refreshed by the background fetchCart dispatch.
        state.numOfCartItems = action.payload.numOfCartItems;
        state.total = action.payload.total;
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        delete state.pendingActions[action.meta.arg];
        state.error = action.payload ?? "Unknown error";
      });

    /* ── removeFromCart ────────────────────────────────────────────────── */
    builder
      .addCase(removeFromCartThunk.pending, (state, action) => {
        state.pendingActions[action.meta.arg] = true;
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        delete state.pendingActions[action.meta.arg];
        state.cartId = action.payload.cartId;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.numOfCartItems = action.payload.numOfCartItems;
      })
      .addCase(removeFromCartThunk.rejected, (state, action) => {
        delete state.pendingActions[action.meta.arg];
        state.error = action.payload ?? "Unknown error";
      });

    /* ── updateQuantity ───────────────────────────────────────────────── */
    builder
      .addCase(updateQuantityThunk.pending, (state, action) => {
        state.pendingActions[action.meta.arg.productId] = true;
      })
      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        delete state.pendingActions[action.meta.arg.productId];
        state.cartId = action.payload.cartId;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.numOfCartItems = action.payload.numOfCartItems;
      })
      .addCase(updateQuantityThunk.rejected, (state, action) => {
        delete state.pendingActions[action.meta.arg.productId];
        state.error = action.payload ?? "Unknown error";
      });

    /* ── mergeGuestCart ────────────────────────────────────────────────── */
    builder
      .addCase(mergeGuestCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeGuestCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartId = action.payload.cartId;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.initialized = true;
      })
      .addCase(mergeGuestCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
    /* ── clearCart ─────────────────────────────────────────────────────── */
    builder
      .addCase(clearCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.loading = false;
        state.cartId = null;
        state.items = [];
        state.total = 0;
        state.numOfCartItems = 0;
      })
      .addCase(clearCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });  },
});

export const {
  setCartMode,
  setGuestCartItems,
  clearCart,
  resetCartInitialized,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
