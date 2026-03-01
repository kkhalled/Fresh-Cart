"use client";

import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import {
  fetchWishlist,
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "../store/wishlist.thunks";

/* ═══════════════════════════════════════════════════════════════════════════
   useWishlistActions
   Lightweight hook for ProductCard — subscribes only to the fields it
   reads (items array, pendingActions) via narrow selectors so that
   unrelated wishlist state changes don't trigger re-renders.
   ═══════════════════════════════════════════════════════════════════════════ */

export function useWishlistActions() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const items = useAppSelector((s) => s.wishlist.items);
  const pendingActions = useAppSelector((s) => s.wishlist.pendingActions);

  const initializedRef = useRef(false);

  /* ── Initialize wishlist on mount (authenticated users only) ────────── */
  useEffect(() => {
    if (isAuthenticated && !initializedRef.current) {
      initializedRef.current = true;
      dispatch(fetchWishlist());
    }
  }, [isAuthenticated, dispatch]);

  /* ── Reset on logout ───────────────────────────────────────────────── */
  useEffect(() => {
    if (!isAuthenticated) {
      initializedRef.current = false;
    }
  }, [isAuthenticated]);

  /* ── Add item ───────────────────────────────────────────────────────── */
  const addItem = useCallback(
    (productId: string) => {
      if (!isAuthenticated) {
        toast.info("Please sign in to add items to your wishlist");
        return;
      }
      if (pendingActions[productId]) return;

      dispatch(addToWishlistThunk(productId))
        .unwrap()
        .then(() => toast.success("Added to wishlist"))
        .catch((err) => toast.error(err || "Failed to add item to wishlist"));
    },
    [isAuthenticated, pendingActions, dispatch],
  );

  /* ── Remove item ────────────────────────────────────────────────────── */
  const removeItem = useCallback(
    (productId: string) => {
      if (pendingActions[productId]) return;

      dispatch(removeFromWishlistThunk(productId))
        .unwrap()
        .then(() => toast.success("Removed from wishlist"))
        .catch(() => toast.error("Failed to remove item"));
    },
    [pendingActions, dispatch],
  );

  /* ── Toggle item ────────────────────────────────────────────────────── */
  const toggleItem = useCallback(
    (productId: string) => {
      const isInWishlist = items.some((item) => item.id === productId);
      if (isInWishlist) {
        removeItem(productId);
      } else {
        addItem(productId);
      }
    },
    [items, addItem, removeItem],
  );

  /* ── Check if item is in wishlist ───────────────────────────────────── */
  const isInWishlist = useCallback(
    (productId: string) => items.some((item) => item.id === productId),
    [items],
  );

  return {
    pendingActions,
    toggleItem,
    isInWishlist,
  };
}
