import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../server/wishlist.server";
import { mapBackendWishlistToItems } from "../utils/wishlist.mapper";
import type { WishlistItem } from "../types/wishlist.types";

/* ═══════════════════════════════════════════════════════════════════════════
   wishlist.thunks.ts
   Async thunks that bridge server actions → Redux state.
   No direct Axios calls — every network operation delegates to the server
   layer. No UI side-effects (toasts) — those belong in the hook.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Payload shape returned by thunks that carry the normalized wishlist. */
interface WishlistPayload {
  items: WishlistItem[];
}

/* ── Fetch Full Wishlist ───────────────────────────────────────────────── */

export const fetchWishlist = createAsyncThunk<
  WishlistPayload,
  void,
  { rejectValue: string }
>("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
  try {
    const response = await getWishlist();
    const items = mapBackendWishlistToItems(response.data);

    return { items };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to load wishlist";
    return rejectWithValue(message);
  }
});

/* ── Add Item to Wishlist ──────────────────────────────────────────────── */

export const addToWishlistThunk = createAsyncThunk<
  WishlistPayload,
  string, // productId
  { rejectValue: string }
>("wishlist/addToWishlist", async (productId, { rejectWithValue }) => {
  try {
    await addToWishlist(productId);

    // Always refetch full wishlist after add to get populated data
    const response = await getWishlist();
    const items = mapBackendWishlistToItems(response.data);

    return { items };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to add item to wishlist";
    return rejectWithValue(message);
  }
});

/* ── Remove Item from Wishlist ─────────────────────────────────────────── */

export const removeFromWishlistThunk = createAsyncThunk<
  WishlistPayload,
  string, // productId
  { rejectValue: string }
>("wishlist/removeFromWishlist", async (productId, { rejectWithValue }) => {
  try {
    await removeFromWishlist(productId);

    // Always refetch full wishlist after remove
    const response = await getWishlist();
    const items = mapBackendWishlistToItems(response.data);

    return { items };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to remove item";
    return rejectWithValue(message);
  }
});
