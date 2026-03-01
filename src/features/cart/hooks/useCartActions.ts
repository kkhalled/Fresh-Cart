"use client";

import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import type { GuestCartItem } from "../types/cart.types";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import {
  setCartMode,
  setGuestCartItems,
  clearCart,
  resetCartInitialized,
} from "../store/cart.slice";
import {
  fetchCart,
  addToCartThunk,
  mergeGuestCartThunk,
} from "../store/cart.thunks";
import {
  getGuestCart,
  addGuestCartItem,
} from "../utils/guestCart.storage";
import { mapGuestCartToItems } from "../utils/cart.mapper";

/* ═══════════════════════════════════════════════════════════════════════════
   useCartActions
   Lightweight hook for components (like ProductCard) that only need
   the addItem action + per-item pending state. Does NOT subscribe to the
   full cart slice — only the fields it actually reads.
   ═══════════════════════════════════════════════════════════════════════════ */

function computeGuestTotal(guestItems: GuestCartItem[]) {
  const items = mapGuestCartToItems(guestItems);
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  return { items, total };
}

export function useCartActions() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const pendingActions = useAppSelector((s) => s.cart.pendingActions);
  const initialized = useAppSelector((s) => s.cart.initialized);
  const loading = useAppSelector((s) => s.cart.loading);
  const mode = useAppSelector((s) => s.cart.mode);

  /* ── Track auth transitions ─────────────────────────────────────────── */
  const prevAuthRef = useRef<boolean | null>(null);

  useEffect(() => {
    dispatch(setCartMode(isAuthenticated ? "auth" : "guest"));

    if (prevAuthRef.current !== null && prevAuthRef.current !== isAuthenticated) {
      dispatch(resetCartInitialized());
      if (!isAuthenticated) {
        dispatch(clearCart());
      }
    }

    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, dispatch]);

  /* ── Initialize cart (runs once until initialized flag is set) ───────── */
  useEffect(() => {
    if (initialized || loading) return;

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
      const { items: mapped, total: guestTotal } = computeGuestTotal(guestItems);
      dispatch(setGuestCartItems({ items: mapped, total: guestTotal }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, loading, isAuthenticated, dispatch]);

  /* ── Add item ───────────────────────────────────────────────────────── */
  const addItem = useCallback(
    (
      productId: string,
      productData?: Omit<GuestCartItem, "productId" | "quantity">,
    ) => {
      if (pendingActions[productId]) return;

      if (isAuthenticated) {
        dispatch(addToCartThunk(productId))
          .unwrap()
          .then(() => toast.success("Added to cart"))
          .catch(() => toast.error("Failed to add item"));
      } else {
        if (!productData) return;
        const newCart = addGuestCartItem({
          productId,
          quantity: 1,
          ...productData,
        });
        const { items: mapped, total: guestTotal } = computeGuestTotal(newCart);
        dispatch(setGuestCartItems({ items: mapped, total: guestTotal }));
        toast.success("Added to cart");
      }
    },
    [isAuthenticated, pendingActions, dispatch],
  );

  return {
    addItem,
    pendingActions,
    mode,
  };
}
