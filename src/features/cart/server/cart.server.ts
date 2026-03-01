"use server";

import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../../auth/server/auth.action";
import { CART_ENDPOINTS } from "@/src/config/api";
import type {
  BackendAddToCartResponse,
  BackendGetCartResponse,
  BackendUpdateCartResponse,
} from "../types/cart.types";

/* ─── Add Product to Cart ──────────────────────────────────────────────── */

export async function addToCart(
  productId: string,
): Promise<BackendAddToCartResponse> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: CART_ENDPOINTS.cart,
    method: "POST",
    data: { productId },
    headers: { token },
  };

  const { data } = await axios.request<BackendAddToCartResponse>(options);

  if (data.status !== "success") {
    throw new Error("Failed to add item to cart");
  }

  return data;
}

/* ─── Get Full Cart (populated products) ───────────────────────────────── */

export async function getCart(): Promise<BackendGetCartResponse> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: CART_ENDPOINTS.cart,
    method: "GET",
    headers: { token },
  };

  const { data } = await axios.request<BackendGetCartResponse>(options);
  return data;
}

/* ─── Remove Product from Cart ─────────────────────────────────────────── */

export async function removeFromCart(
  productId: string,
): Promise<BackendUpdateCartResponse> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: CART_ENDPOINTS.cartItem(productId),
    method: "DELETE",
    headers: { token },
  };

  const { data } = await axios.request<BackendUpdateCartResponse>(options);
  return data;
}

/* ─── Update Product Quantity ──────────────────────────────────────────── */

export async function updateQuantity(
  productId: string,
  count: number,
): Promise<BackendUpdateCartResponse> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: CART_ENDPOINTS.cartItem(productId),
    method: "PUT",
    data: { count },
    headers: { token },
  };

  const { data } = await axios.request<BackendUpdateCartResponse>(options);
  return data;
}

/* ─── Clear Entire Cart ────────────────────────────────────────────────── */

export async function clearCartServer(): Promise<void> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: CART_ENDPOINTS.cart,
    method: "DELETE",
    headers: { token },
  };

  await axios.request(options);
}

/* ─── Merge Guest Cart into Authenticated Cart ─────────────────────────── */

export async function mergeGuestCart(
  items: { productId: string; quantity: number }[],
): Promise<void> {
  for (const item of items) {
    await addToCart(item.productId);

    if (item.quantity > 1) {
      await updateQuantity(item.productId, item.quantity);
    }
  }
}
