import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCashOrder, createOnlineSession } from "../server/checkout.server";
import type { ShippingAddress } from "../types/checkout.types";

/* ═══════════════════════════════════════════════════════════════════════════
   checkout.thunks.ts
   Async thunks that bridge server actions → Redux state.
   No direct Axios calls — delegates to the server layer.
   ═══════════════════════════════════════════════════════════════════════════ */

interface CashOrderPayload {
  orderId: string;
}

interface OnlineSessionPayload {
  sessionUrl: string;
}

/* ─── Cash Order ───────────────────────────────────────────────────────── */

export const createCashOrderThunk = createAsyncThunk<
  CashOrderPayload,
  { cartId: string; shippingAddress: ShippingAddress },
  { rejectValue: string }
>(
  "checkout/createCashOrder",
  async ({ cartId, shippingAddress }, { rejectWithValue }) => {
    try {
      const response = await createCashOrder(cartId, shippingAddress);
      return { orderId: response.data._id };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to place order";
      return rejectWithValue(message);
    }
  },
);

/* ─── Online Payment Session ───────────────────────────────────────────── */

export const createOnlineSessionThunk = createAsyncThunk<
  OnlineSessionPayload,
  { cartId: string; shippingAddress: ShippingAddress; originUrl: string },
  { rejectValue: string }
>(
  "checkout/createOnlineSession",
  async ({ cartId, shippingAddress, originUrl }, { rejectWithValue }) => {
    try {
      const response = await createOnlineSession(
        cartId,
        shippingAddress,
        originUrl,
      );
      return { sessionUrl: response.session.url };
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create payment session";
      return rejectWithValue(message);
    }
  },
);
