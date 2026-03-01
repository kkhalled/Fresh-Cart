import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
  mergeGuestCart,
  clearCartServer,
} from "../server/cart.server";
import { mapBackendCartToItems } from "../utils/cart.mapper";
import { clearGuestCart } from "../utils/guestCart.storage";
import type { CartItem } from "../types/cart.types";

/* ═══════════════════════════════════════════════════════════════════════════
   cart.thunks.ts
   Async thunks that bridge server actions → Redux state.
   No direct Axios calls — every network operation delegates to the server
   layer. No UI side-effects (toasts) — those belong in the hook.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Payload shape returned by thunks that carry the normalised cart. */
interface CartPayload {
  cartId: string;
  items: CartItem[];
  total: number;
  numOfCartItems: number;
}

/** Lightweight payload from add-to-cart (badge + total only). */
interface AddToCartPayload {
  numOfCartItems: number;
  total: number;
}

/* ─── Fetch Full Cart ──────────────────────────────────────────────────── */

export const fetchCart = createAsyncThunk<
  CartPayload,
  void,
  { rejectValue: string }
>("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const response = await getCart();
    const items = mapBackendCartToItems(response.data);

    return {
      cartId: response.data._id,
      items,
      total: response.data.totalCartPrice,
      numOfCartItems: response.numOfCartItems,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to load cart";
    return rejectWithValue(message);
  }
});

/* ─── Add Item to Cart ─────────────────────────────────────────────────── */

export const addToCartThunk = createAsyncThunk<
  AddToCartPayload,
  string, // productId
  { rejectValue: string }
>("cart/addToCart", async (productId, { rejectWithValue, dispatch }) => {
  try {
    const response = await addToCart(productId);

    // Immediately refetch the full populated cart in the background
    // so item cards render properly after the add completes.
    dispatch(fetchCart());

    return {
      numOfCartItems: response.numOfCartItems,
      total: response.data.totalCartPrice,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to add item to cart";
    return rejectWithValue(message);
  }
});

/* ─── Remove Item from Cart ────────────────────────────────────────────── */

export const removeFromCartThunk = createAsyncThunk<
  CartPayload,
  string, // productId
  { rejectValue: string }
>("cart/removeFromCart", async (productId, { rejectWithValue }) => {
  try {
    const response = await removeFromCart(productId);
    const items = mapBackendCartToItems(response.data);

    return {
      cartId: response.data._id,
      items,
      total: response.data.totalCartPrice,
      numOfCartItems: response.numOfCartItems,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to remove item";
    return rejectWithValue(message);
  }
});

/* ─── Update Item Quantity ─────────────────────────────────────────────── */

export const updateQuantityThunk = createAsyncThunk<
  CartPayload,
  { productId: string; count: number },
  { rejectValue: string }
>("cart/updateQuantity", async ({ productId, count }, { rejectWithValue }) => {
  try {
    const response = await updateQuantity(productId, count);
    const items = mapBackendCartToItems(response.data);

    return {
      cartId: response.data._id,
      items,
      total: response.data.totalCartPrice,
      numOfCartItems: response.numOfCartItems,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update quantity";
    return rejectWithValue(message);
  }
});

/* ─── Clear Entire Cart ────────────────────────────────────────────────── */

export const clearCartThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("cart/clearCart", async (_, { rejectWithValue }) => {
  try {
    await clearCartServer();
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to clear cart";
    return rejectWithValue(message);
  }
});

/* ─── Merge Guest Cart after Login ─────────────────────────────────────── */

export const mergeGuestCartThunk = createAsyncThunk<
  CartPayload,
  { productId: string; quantity: number }[],
  { rejectValue: string }
>("cart/mergeGuestCart", async (guestItems, { rejectWithValue }) => {
  try {
    // Server-side: adds each product & sets quantity.
    await mergeGuestCart(guestItems);

    // Wipe localStorage.
    clearGuestCart();

    // Refetch the unified cart with populated product data.
    const response = await getCart();
    const items = mapBackendCartToItems(response.data);

    return {
      cartId: response.data._id,
      items,
      total: response.data.totalCartPrice,
      numOfCartItems: response.numOfCartItems,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to merge cart";
    return rejectWithValue(message);
  }
});
