"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import {
  setCartMode,
  setGuestCartItems,
  clearCart,
  resetCartInitialized,
} from "@/src/features/cart/store/cart.slice";
import { fetchCart } from "@/src/features/cart/store/cart.thunks";
import { fetchWishlist } from "@/src/features/wishlist/store/wishlist.thunks";
import { getGuestCart } from "@/src/features/cart/utils/guestCart.storage";
import { mapGuestCartToItems } from "@/src/features/cart/utils/cart.mapper";
import type { GuestCartItem } from "@/src/features/cart/types/cart.types";

/* ═══════════════════════════════════════════════════════════════════════════
   StoreInitializer
   Runs ONCE at the provider level to initialize cart & wishlist state.
   
   Cart merge (guest→auth) is handled by the signin hook directly.
   This component only fetches the server cart on page refresh and
   handles guest-mode initialization from localStorage.
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
      if (!isAuthenticated) {
        // auth → guest (logout): clear server cart state, reset so guest
        // cart can be loaded from localStorage on next init cycle.
        dispatch(resetCartInitialized());
        dispatch(clearCart());
      }
      // guest → auth: the signin handler already merged the guest cart
      // and populated the Redux state. No reset needed here.
    }

    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, dispatch]);

  /* ── Initialize cart once ───────────────────────────────────────────── */
  useEffect(() => {
    if (cartInitialized || cartLoading) return;

    if (isAuthenticated) {
      // On page refresh / initial load, just fetch the server cart.
      // The signin flow already handled any guest → auth merge.
      dispatch(fetchCart());
    } else {
      // Guest mode — hydrate Redux from localStorage
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

