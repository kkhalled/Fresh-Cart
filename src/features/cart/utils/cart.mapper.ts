import type {
  BackendCartData,
  BackendPopulatedProduct,
  CartItem,
  GuestCartItem,
} from "../types/cart.types";

/* ═══════════════════════════════════════════════════════════════════════════
   cart.mapper.ts
   Normalises raw backend cart responses into the CartItem[] shape that
   every UI component consumes. No component should ever touch the backend
   structure directly.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Maps a fully-populated backend cart response (GET /cart, PUT, DELETE)
 * into the normalised `CartItem[]` the UI consumes.
 *
 * Products whose `product` field is still a raw ID string (e.g. from
 * POST /cart) are silently skipped.
 */
export function mapBackendCartToItems(data: BackendCartData): CartItem[] {
  return data.products
    .filter(
      (entry): entry is typeof entry & { product: BackendPopulatedProduct } =>
        typeof entry.product === "object" && entry.product !== null,
    )
    .map((entry) => {
      const prod = entry.product;

      return {
        id: entry._id,
        productId: prod._id,
        title: prod.title,
        category: prod.category?.name ?? "",
        price: entry.price,
        originalPrice: prod.price,
        imageCover: prod.imageCover,
        quantity: entry.count,
        ratingsAverage: prod.ratingsAverage ?? 0,
        ratingsQuantity: prod.ratingsQuantity ?? 0,
      };
    });
}

/**
 * Converts guest-cart items (from localStorage) to the normalised
 * `CartItem[]` shape. Guest items lack a backend-assigned `_id`, so
 * the `productId` doubles as the `id`.
 */
export function mapGuestCartToItems(guestItems: GuestCartItem[]): CartItem[] {
  return guestItems.map((g) => ({
    id: g.productId,
    productId: g.productId,
    title: g.title,
    imageCover: g.imageCover,
    category: g.category,
    price: g.price,
    originalPrice: g.price,
    quantity: g.quantity,
    ratingsAverage: g.ratingsAverage,
    ratingsQuantity: g.ratingsQuantity,
  }));
}
