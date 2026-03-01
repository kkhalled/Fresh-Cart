/* ═══════════════════════════════════════════════════════════════════════════
   Checkout Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type PaymentMethod = "cash" | "online";

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

/* ─── Backend Responses ─────────────────────────────────────────────────── */

export interface BackendCashOrderResponse {
  status: string;
  data: {
    _id: string;
    user: string;
    cartItems: {
      count: number;
      product: string;
      price: number;
      _id: string;
    }[];
    shippingAddress: ShippingAddress;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface BackendOnlineSessionResponse {
  status: string;
  session: {
    url: string;
    id: string;
  };
}

/* ─── Redux State Shape ─────────────────────────────────────────────────── */

export interface CheckoutState {
  loading: boolean;
  error: string | null;
  paymentMethod: PaymentMethod;
}
