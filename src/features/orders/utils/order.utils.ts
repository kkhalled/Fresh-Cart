import type { BackendOrder, OrderStatus } from "../types/order.types";

/* ═══════════════════════════════════════════════════════════════════════════
   order.utils.ts
   Pure utility functions for the Orders feature.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Derive display status from backend order flags.
 *
 *  - Not paid + cash → "pending"   (awaiting confirmation)
 *  - Paid + not delivered → "processing"
 *  - Paid + delivered   → "delivered"
 */
export function deriveOrderStatus(order: BackendOrder): OrderStatus {
  if (!order.isPaid && order.paymentMethodType === "cash") return "pending";
  if (order.isPaid && !order.isDelivered) return "processing";
  return "delivered";
}

/** Status → badge colour mapping (Tailwind classes). */
export const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  processing: {
    label: "Processing",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  delivered: {
    label: "Delivered",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
};

/**
 * Format ISO date string to a compact, human-readable form.
 * e.g.  "Mar 1, 2026"
 */
export function formatOrderDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
