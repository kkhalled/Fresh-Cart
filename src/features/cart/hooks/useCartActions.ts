"use client";

import { useCallback } from "react";
import { toast } from "react-toastify";
import type { GuestCartItem } from "../types/cart.types";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import {
  setGuestCartItems,
} from "../store/cart.slice";
import {
  addToCartThunk,
} from "../store/cart.thunks";
import {
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
  const mode = useAppSelector((s) => s.cart.mode);

  // Cart initialization + guest→auth merge is handled centrally by
  // `src/providers/StoreInitializer.tsx` to avoid duplicated effects.

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
