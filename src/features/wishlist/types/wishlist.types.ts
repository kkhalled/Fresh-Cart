import type { Product } from "../../products/types/products.types";

/* ═══════════════════════════════════════════════════════════════════════════
   wishlist.types.ts
   Type definitions for wishlist feature — separates backend responses from
   normalized UI types.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Backend Response Types ────────────────────────────────────────────── */

export interface BackendAddToWishlistResponse {
  status: string;
  message: string;
  data: string[]; // Array of product IDs
}

export interface BackendGetWishlistResponse {
  status: string;
  count: number;
  data: Product[]; // Array of populated product objects
}

/* ── Normalized UI Types ───────────────────────────────────────────────── */

export interface WishlistItem {
  id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: string;
  brand: string;
}

/* ── Redux State Shape ─────────────────────────────────────────────────── */

export interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
  pendingActions: Record<string, boolean>; // productId → isPending
}
