"use client";

import { useCallback } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { addToCartThunk } from "../../cart/store/cart.thunks";
import { setGuestCartItems } from "../../cart/store/cart.slice";
import { addGuestCartItem } from "../../cart/utils/guestCart.storage";
import { mapGuestCartToItems } from "../../cart/utils/cart.mapper";
import {
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "../../wishlist/store/wishlist.thunks";
import type { GuestCartItem } from "../../cart/types/cart.types";

/* ═══════════════════════════════════════════════════════════════════════════
   useProductCardActions
   Ultra-narrow hook for ProductCard. Every selector returns a primitive
   (boolean / string) so that React-Redux's strict-equality check prevents
   re-renders unless THIS specific product's state actually changes.

   Initialization is handled by StoreInitializer — NOT here.
   ═══════════════════════════════════════════════════════════════════════════ */

function computeGuestTotal(guestItems: GuestCartItem[]) {
  const items = mapGuestCartToItems(guestItems);
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  return { items, total };
}

export function useProductCardActions(productId: string) {
  const dispatch = useAppDispatch();

  // ── Narrow selectors — each returns a primitive ─────────────────────
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const isAddToCartPending = useAppSelector(
    (s) => !!s.cart.pendingActions[productId],
  );
  const isInWishlist = useAppSelector((s) =>
    s.wishlist.items.some((item) => item.id === productId),
  );
  const isWishlistPending = useAppSelector(
    (s) => !!s.wishlist.pendingActions[productId],
  );

  // ── Add to cart ─────────────────────────────────────────────────────
  const addToCart = useCallback(
    (productData?: Omit<GuestCartItem, "productId" | "quantity">) => {
      if (isAddToCartPending) return;

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
    [isAuthenticated, isAddToCartPending, dispatch, productId],
  );

  // ── Toggle wishlist ─────────────────────────────────────────────────
  const toggleWishlist = useCallback(() => {
    if (!isAuthenticated) {
      toast.info("Please sign in to add items to your wishlist");
      return;
    }
    if (isWishlistPending) return;

    const thunk = isInWishlist
      ? removeFromWishlistThunk(productId)
      : addToWishlistThunk(productId);

    dispatch(thunk)
      .unwrap()
      .then(() =>
        toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist"),
      )
      .catch((err) =>
        toast.error(
          typeof err === "string" ? err : "Failed to update wishlist",
        ),
      );
  }, [isAuthenticated, isWishlistPending, isInWishlist, dispatch, productId]);

  return {
    addToCart,
    isAddToCartPending,
    toggleWishlist,
    isInWishlist,
    isWishlistPending,
  };
}
