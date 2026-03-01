"use client";

import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import type { GuestCartItem, CartState } from "../types/cart.types";
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
  removeFromCartThunk,
  updateQuantityThunk,
  mergeGuestCartThunk,
  clearCartThunk,
} from "../store/cart.thunks";
import {
  getGuestCart,
  addGuestCartItem,
  removeGuestCartItem,
  updateGuestCartItemQuantity,
} from "../utils/guestCart.storage";
import { mapGuestCartToItems } from "../utils/cart.mapper";

/* ═══════════════════════════════════════════════════════════════════════════
   useCart
   Unified cart hook — decides guest vs auth mode, exposes every cart
   action, and prevents double-click spam with per-item pending flags.

   Components call this hook and receive plain values + stable callbacks.
   No Axios, no localStorage, no Redux internals leak to the UI.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Helper: compute total from items array (guest mode only). */
function computeGuestTotal(
  guestItems: GuestCartItem[],
): { items: ReturnType<typeof mapGuestCartToItems>; total: number } {
  const items = mapGuestCartToItems(guestItems);
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  return { items, total };
}

export function useCart() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  const cart = useAppSelector((s) => s.cart) as CartState;
  const {
    mode,
    items,
    total,
    numOfCartItems,
    loading,
    error,
    initialized,
    pendingActions,
  } = cart;

  /* ── Track auth transitions ─────────────────────────────────────────── */
  const prevAuthRef = useRef<boolean | null>(null);

  useEffect(() => {
    dispatch(setCartMode(isAuthenticated ? "auth" : "guest"));

    // Detect auth-state transition (login / logout)
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
      const { items: mapped, total: guestTotal } =
        computeGuestTotal(guestItems);
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
      if (pendingActions[productId]) return; // block double-click

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
        const { items: mapped, total: guestTotal } =
          computeGuestTotal(newCart);
        dispatch(setGuestCartItems({ items: mapped, total: guestTotal }));
        toast.success("Added to cart");
      }
    },
    [isAuthenticated, pendingActions, dispatch],
  );

  /* ── Remove item ────────────────────────────────────────────────────── */
  const removeItem = useCallback(
    (productId: string) => {
      if (pendingActions[productId]) return;

      if (isAuthenticated) {
        dispatch(removeFromCartThunk(productId))
          .unwrap()
          .then(() => toast.success("Item removed"))
          .catch(() => toast.error("Failed to remove item"));
      } else {
        const newCart = removeGuestCartItem(productId);
        const { items: mapped, total: guestTotal } =
          computeGuestTotal(newCart);
        dispatch(setGuestCartItems({ items: mapped, total: guestTotal }));
        toast.success("Item removed");
      }
    },
    [isAuthenticated, pendingActions, dispatch],
  );

  /* ── Update quantity ────────────────────────────────────────────────── */
  const updateItemQuantity = useCallback(
    (productId: string, count: number) => {
      if (pendingActions[productId]) return;
      if (count < 1 || count > 99) return;

      if (isAuthenticated) {
        dispatch(updateQuantityThunk({ productId, count }))
          .unwrap()
          .catch(() => toast.error("Failed to update quantity"));
      } else {
        const newCart = updateGuestCartItemQuantity(productId, count);
        const { items: mapped, total: guestTotal } =
          computeGuestTotal(newCart);
        dispatch(setGuestCartItems({ items: mapped, total: guestTotal }));
      }
    },
    [isAuthenticated, pendingActions, dispatch],
  );

  /* ── Clear all items ─────────────────────────────────────────────────── */
  const clearAllItems = useCallback(() => {
    if (isAuthenticated) {
      dispatch(clearCartThunk())
        .unwrap()
        .then(() => toast.success("Cart cleared"))
        .catch(() => toast.error("Failed to clear cart"));
    } else {
      dispatch(clearCart());
      if (typeof window !== "undefined") {
        localStorage.removeItem("guestCart");
      }
      toast.success("Cart cleared");
    }
  }, [isAuthenticated, dispatch]);

  return {
    items,
    total,
    numOfCartItems,
    loading,
    error,
    mode,
    pendingActions,
    addItem,
    removeItem,
    updateQuantity: updateItemQuantity,
    clearAllItems,
  };
}
