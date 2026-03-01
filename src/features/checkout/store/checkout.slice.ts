import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CheckoutState, PaymentMethod } from "../types/checkout.types";
import { createCashOrderThunk, createOnlineSessionThunk } from "./checkout.thunks";

/* ═══════════════════════════════════════════════════════════════════════════
   checkout.slice.ts
   Pure Redux logic for checkout state.
   ═══════════════════════════════════════════════════════════════════════════ */

const initialState: CheckoutState = {
  loading: false,
  error: null,
  paymentMethod: "cash",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.paymentMethod = action.payload;
    },
    resetCheckout(state) {
      state.loading = false;
      state.error = null;
      state.paymentMethod = "cash";
    },
  },
  extraReducers: (builder) => {
    /* ── Cash Order ───────────────────────────────────────────────────── */
    builder
      .addCase(createCashOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCashOrderThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCashOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to place order";
      });

    /* ── Online Session ───────────────────────────────────────────────── */
    builder
      .addCase(createOnlineSessionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOnlineSessionThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOnlineSessionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create payment session";
      });
  },
});

export const { setPaymentMethod, resetCheckout } = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
