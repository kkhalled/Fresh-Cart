"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/src/store/store";
import useOrders from "../hooks/useOrders";
import OrderCard from "../components/OrderCard";
import OrdersSkeleton from "../components/OrdersSkeleton";
import EmptyOrders from "../components/EmptyOrders";

/* ═══════════════════════════════════════════════════════════════════════════
   OrdersScreen
   Main page-level component for the /orders route.
   Shows a list of past orders with status, thumbnails, totals,
   loading skeleton, empty state, and error handling.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function OrdersScreen() {
  const router = useRouter();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  const {
    orders,
    loading,
    error,
    totalResults,
    refetch,
  } = useOrders();

  /* ── Auth guard ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin?redirect=/orders");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              My Orders
            </h1>
            {!loading && totalResults > 0 && (
              <p className="text-sm text-neutral-500 mt-1">
                {totalResults} {totalResults === 1 ? "order" : "orders"}
              </p>
            )}
          </div>
          {!loading && orders.length > 0 && (
            <button
              type="button"
              onClick={refetch}
              className="
                inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md
                bg-white border border-neutral-200 text-neutral-700
                hover:bg-neutral-50 transition-colors
              "
            >
              <FontAwesomeIcon icon={faArrowRotateRight} className="w-3 h-3" />
              Refresh
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && <OrdersSkeleton />}

        {/* Error */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-sm text-red-600 font-medium mb-3">{error}</p>
            <button
              type="button"
              onClick={refetch}
              className="
                inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg
                bg-red-600 text-white hover:bg-red-700 transition-colors
              "
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && orders.length === 0 && <EmptyOrders />}

        {/* Order List */}
        {!loading && !error && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
