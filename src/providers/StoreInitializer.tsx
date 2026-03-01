"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import {
  setCartMode,
  setGuestCartItems,
  clearCart,
  resetCartInitialized,
} from "@/src/features/cart/store/cart.slice";
import {
  fetchCart,
  mergeGuestCartThunk,
} from "@/src/features/cart/store/cart.thunks";
import { fetchWishlist } from "@/src/features/wishlist/store/wishlist.thunks";
import { getGuestCart } from "@/src/features/cart/utils/guestCart.storage";
import { mapGuestCartToItems } from "@/src/features/cart/utils/cart.mapper";
import type { GuestCartItem } from "@/src/features/cart/types/cart.types";
import { toast } from "react-toastify";

/* ═══════════════════════════════════════════════════════════════════════════
   StoreInitializer
   Runs ONCE at the provider level to initialize cart & wishlist state.
   Prevents every ProductCard from independently triggering init logic
   and dispatching redundant API calls.
   ═══════════════════════════════════════════════════════════════════════════ */

function computeGuestTotal(guestItems: GuestCartItem[]) {
  const items = mapGuestCartToItems(guestItems);
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  return { items, total };
}

export default function StoreInitializer() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const cartInitialized = useAppSelector((s) => s.cart.initialized);
  const cartLoading = useAppSelector((s) => s.cart.loading);

  const prevAuthRef = useRef<boolean | null>(null);
  const wishlistInitRef = useRef(false);

  /* ── Track auth transitions (cart) ──────────────────────────────────── */
  useEffect(() => {
    dispatch(setCartMode(isAuthenticated ? "auth" : "guest"));

    if (
      prevAuthRef.current !== null &&
      prevAuthRef.current !== isAuthenticated
    ) {
      dispatch(resetCartInitialized());
      if (!isAuthenticated) {
        dispatch(clearCart());
      }
    }

    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, dispatch]);

  /* ── Initialize cart once ───────────────────────────────────────────── */
  useEffect(() => {
    if (cartInitialized || cartLoading) return;

    if (isAuthenticated) {
      const guestItems = getGuestCart();

      if (guestItems.length > 0) {
        dispatch(
          mergeGuestCartThunk(
            guestItems.map((g) => ({
              productId: g.productId,
              quantity: g.quantity,
            })),
          ),
        )
          .unwrap()
          .then(() => {
            toast.success("Your saved items have been added to your cart!");
          })
          .catch(() => {
            toast.error("Failed to merge your saved items.");
            dispatch(fetchCart());
          });
      } else {
        dispatch(fetchCart());
      }
    } else {
      const guestItems = getGuestCart();
      const { items: mapped, total: guestTotal } =
        computeGuestTotal(guestItems);
      dispatch(setGuestCartItems({ items: mapped, total: guestTotal }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartInitialized, cartLoading, isAuthenticated, dispatch]);

  /* ── Initialize wishlist once (authenticated only) ──────────────────── */
  useEffect(() => {
    if (isAuthenticated && !wishlistInitRef.current) {
      wishlistInitRef.current = true;
      dispatch(fetchWishlist());
    }
    if (!isAuthenticated) {
      wishlistInitRef.current = false;
    }
  }, [isAuthenticated, dispatch]);

  return null;
}
