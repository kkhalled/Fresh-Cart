"use server";

import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../../auth/server/auth.action";
import { ORDER_ENDPOINTS } from "@/src/config/api";
import type { OrdersResponse, BackendOrder } from "../types/order.types";

/* ═══════════════════════════════════════════════════════════════════════════
   orders.server.ts
   Server-side order actions. All Axios calls live here.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Fetch all orders for a specific user.
 */
export async function getUserOrders(
  userId: string,
): Promise<OrdersResponse | BackendOrder[]> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: ORDER_ENDPOINTS.userOrders(userId),
    method: "GET",
    headers: { token },
  };

  const { data } = await axios.request<OrdersResponse | BackendOrder[]>(options);
  return data;
}
