import type { GuestCartItem } from "../types/cart.types";

/* ═══════════════════════════════════════════════════════════════════════════
   guestCart.storage.ts
   Thin wrapper around localStorage for guest-cart persistence.
   All reads/writes are guarded for SSR and quota-exceeded safety.
   ═══════════════════════════════════════════════════════════════════════════ */

const STORAGE_KEY = "freshcart_guest_cart";

/* ─── Core CRUD ─────────────────────────────────────────────────────────── */

/** Returns every guest-cart item (empty array when nothing stored). */
export function getGuestCart(): GuestCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GuestCartItem[]) : [];
  } catch {
    return [];
  }
}

/** Overwrites the entire guest cart with `items`. */
export function saveGuestCart(items: GuestCartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage full or unavailable — silently degrade
  }
}

/** Removes the guest cart from localStorage completely. */
export function clearGuestCart(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silently degrade
  }
}

/* ─── Granular Helpers ──────────────────────────────────────────────────── */

/**
 * Adds an item to the guest cart.
 * If the product already exists, its quantity is **merged** (summed).
 * Returns the updated cart array.
 */
export function addGuestCartItem(item: GuestCartItem): GuestCartItem[] {
  const cart = getGuestCart();
  const existing = cart.find((i) => i.productId === item.productId);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push({ ...item });
  }

  saveGuestCart(cart);
  return cart;
}

/**
 * Removes an item entirely from the guest cart by `productId`.
 * Returns the updated cart array.
 */
export function removeGuestCartItem(productId: string): GuestCartItem[] {
  const cart = getGuestCart().filter((i) => i.productId !== productId);
  saveGuestCart(cart);
  return cart;
}

/**
 * Sets an exact quantity for a guest-cart item.
 * If `count` is ≤ 0 the item is removed instead.
 * Returns the updated cart array.
 */
export function updateGuestCartItemQuantity(
  productId: string,
  count: number,
): GuestCartItem[] {
  if (count <= 0) return removeGuestCartItem(productId);

  const cart = getGuestCart().map((i) =>
    i.productId === productId ? { ...i, quantity: count } : i,
  );

  saveGuestCart(cart);
  return cart;
}
