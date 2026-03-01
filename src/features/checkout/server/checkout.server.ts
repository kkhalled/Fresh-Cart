"use server";

import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../../auth/server/auth.action";
import { CHECKOUT_ENDPOINTS } from "@/src/config/api";
import type {
  ShippingAddress,
  BackendCashOrderResponse,
  BackendOnlineSessionResponse,
} from "../types/checkout.types";

/* ═══════════════════════════════════════════════════════════════════════════
   checkout.server.ts
   Server-side checkout actions. All Axios calls live here.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Create a Cash on Delivery order.
 */
export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress,
): Promise<BackendCashOrderResponse> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: CHECKOUT_ENDPOINTS.cashOrder(cartId),
    method: "POST",
    data: { shippingAddress },
    headers: { token },
  };

  const { data } = await axios.request<BackendCashOrderResponse>(options);
  return data;
}

/**
 * Create an online payment session (Stripe).
 * Returns a session URL to redirect the user.
 */
export async function createOnlineSession(
  cartId: string,
  shippingAddress: ShippingAddress,
  originUrl: string,
): Promise<BackendOnlineSessionResponse> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: CHECKOUT_ENDPOINTS.onlineSession(cartId, originUrl),
    method: "POST",
    data: { shippingAddress },
    headers: { token },
  };

  const { data } = await axios.request<BackendOnlineSessionResponse>(options);
  return data;
}
