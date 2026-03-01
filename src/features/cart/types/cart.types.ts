/* ═══════════════════════════════════════════════════════════════════════════
   Cart Types — Backend responses + Normalized UI types + Redux state shape
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Backend Raw Types ─────────────────────────────────────────────────── */

/** Single product entry inside a cart response (add-to-cart returns string IDs). */
export interface BackendCartProduct {
  count: number;
  _id: string;
  product: string | BackendPopulatedProduct;
  price: number;
}

/** Fully populated product returned by GET /cart. */
export interface BackendPopulatedProduct {
  _id: string;
  title: string;
  slug: string;
  imageCover: string;
  category: { _id: string; name: string; slug: string };
  brand: { _id: string; name: string; slug: string };
  ratingsAverage: number;
  ratingsQuantity: number;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  id: string;
}

/** Backend cart data envelope. */
export interface BackendCartData {
  _id: string;
  cartOwner: string;
  products: BackendCartProduct[];
  totalCartPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

/** Response from POST /cart (add item). Product IDs only — not populated. */
export interface BackendAddToCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  data: {
    _id: string;
    cartOwner: string;
    products: { count: number; _id: string; product: string; price: number }[];
    totalCartPrice: number;
  };
}

/** Response from GET /cart. Products are fully populated. */
export interface BackendGetCartResponse {
  status: string;
  numOfCartItems: number;
  data: BackendCartData;
}

/** Response from PUT /cart/:id and DELETE /cart/:id. Products are populated. */
export interface BackendUpdateCartResponse {
  status: string;
  numOfCartItems: number;
  data: BackendCartData;
}

/* ─── Normalized UI Types ───────────────────────────────────────────────── */

/** Normalized cart item consumed by all UI components. */
export interface CartItem {
  id: string;
  productId: string;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  imageCover: string;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
}

/** Minimal item stored in localStorage for guest carts. */
export interface GuestCartItem {
  productId: string;
  title: string;
  imageCover: string;
  category: string;
  price: number;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
}

/* ─── Redux State Shape ─────────────────────────────────────────────────── */

export interface CartState {
  mode: "auth" | "guest";
  cartId: string | null;
  items: CartItem[];
  total: number;
  numOfCartItems: number;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  pendingActions: Record<string, boolean>;
}
