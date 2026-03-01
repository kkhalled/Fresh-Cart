/* ═══════════════════════════════════════════════════════════════════════════
   order.types.ts
   TypeScript interfaces for the Orders feature.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Backend Shapes ────────────────────────────────────────────────────── */

export interface BackendCartItemProduct {
  _id: string;
  title: string;
  imageCover: string;
}

export interface BackendCartItem {
  count: number;
  price: number;
  _id: string;
  product: BackendCartItemProduct;
}

export interface BackendShippingAddress {
  city: string;
  details?: string;
  phone?: string;
}

export interface BackendOrder {
  _id: string;
  totalOrderPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paymentMethodType: "cash" | "card";
  createdAt: string;
  shippingAddress: BackendShippingAddress;
  cartItems: BackendCartItem[];
}

/* ─── API Response ──────────────────────────────────────────────────────── */

export interface OrdersResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: BackendOrder[];
}

/* ─── Derived Status ────────────────────────────────────────────────────── */

export type OrderStatus = "pending" | "processing" | "delivered";
