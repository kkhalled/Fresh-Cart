import type { Product } from "../../products/types/products.types";
import type { WishlistItem } from "../types/wishlist.types";

/* ═══════════════════════════════════════════════════════════════════════════
   wishlist.mapper.ts
   Normalizes backend product structure into UI-consumable format.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Maps backend populated products to normalized WishlistItem[].
 */
export function mapBackendWishlistToItems(
  products: Product[],
): WishlistItem[] {
  return products.map((product) => ({
    id: product._id,
    title: product.title,
    imageCover: product.imageCover,
    price: product.price,
    priceAfterDiscount: product.priceAfterDiscount,
    ratingsAverage: product.ratingsAverage,
    ratingsQuantity: product.ratingsQuantity,
    category: product.category.name,
    brand: product.brand.name,
  }));
}
