"use client";

import { useEffect, useState, useCallback } from "react";
import { useAppSelector } from "@/src/store/store";
import { getUserOrders } from "../server/orders.server";
import type { BackendOrder, OrdersResponse } from "../types/order.types";

/* ═══════════════════════════════════════════════════════════════════════════
   useOrders
   Fetches orders for the currently authenticated user.
   Pagination-ready: accepts page param, returns metadata.
   ═══════════════════════════════════════════════════════════════════════════ */

interface UseOrdersReturn {
  orders: BackendOrder[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  numberOfPages: number;
  refetch: () => void;
}

export default function useOrders(): UseOrdersReturn {
  const userId = useAppSelector((s) => s.auth.userInfo?.id);

  const [orders, setOrders] = useState<BackendOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);

  const fetchOrders = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getUserOrders(userId);

      // The API may return an array directly or { data: [...], metadata: {...} }
      const ordersList = Array.isArray(response) ? response : (response.data ?? []);
      setOrders(ordersList);
      setTotalResults(Array.isArray(response) ? ordersList.length : (response.results ?? ordersList.length));

      if (!Array.isArray(response) && response.metadata) {
        setCurrentPage(response.metadata.currentPage);
        setNumberOfPages(response.metadata.numberOfPages);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load orders";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    totalResults,
    currentPage,
    numberOfPages,
    refetch: fetchOrders,
  };
}
