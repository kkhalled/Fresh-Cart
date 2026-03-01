"use server";

import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../../auth/server/auth.action";
import { WISHLIST_ENDPOINTS } from "@/src/config/api";
import type {
  BackendAddToWishlistResponse,
  BackendGetWishlistResponse,
} from "../types/wishlist.types";

/* ═══════════════════════════════════════════════════════════════════════════
   wishlist.server.ts
   Server-side API layer — only Axios calls, no Redux logic.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Add Product to Wishlist ───────────────────────────────────────────── */

export async function addToWishlist(
  productId: string,
): Promise<BackendAddToWishlistResponse> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: WISHLIST_ENDPOINTS.wishlist,
    method: "POST",
    data: { productId },
    headers: { token },
  };

  const { data } = await axios.request<BackendAddToWishlistResponse>(options);

  if (data.status !== "success") {
    throw new Error("Failed to add item to wishlist");
  }

  return data;
}

/* ── Get Full Wishlist (populated products) ────────────────────────────── */

export async function getWishlist(): Promise<BackendGetWishlistResponse> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: WISHLIST_ENDPOINTS.wishlist,
    method: "GET",
    headers: { token },
  };

  const { data } = await axios.request<BackendGetWishlistResponse>(options);
  return data;
}

/* ── Remove Product from Wishlist ──────────────────────────────────────── */

export async function removeFromWishlist(
  productId: string,
): Promise<BackendAddToWishlistResponse> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: WISHLIST_ENDPOINTS.wishlistItem(productId),
    method: "DELETE",
    headers: { token },
  };

  const { data } = await axios.request<BackendAddToWishlistResponse>(options);
  return data;
}
