"use client";

import { useAppSelector } from "@/src/store/store";

/**
 * Lightweight hook that only subscribes to the cart badge count.
 * Use this in components (like Navbar) that only need to display
 * the number of cart items — avoids re-rendering on every cart
 * state change (loading, pending, items array, etc.).
 */
export function useCartCount() {
  return useAppSelector((s) => s.cart.numOfCartItems);
}
