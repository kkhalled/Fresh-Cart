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
   useWishlist
   Unified wishlist hook — exposes all wishlist operations.
   Prevents rapid clicks, handles errors, keeps backend as source of truth.
   ═══════════════════════════════════════════════════════════════════════════ */

export function useWishlist() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const items = useAppSelector((state) => state.wishlist.items);
  const loading = useAppSelector((state) => state.wishlist.loading);
  const error = useAppSelector((state) => state.wishlist.error);
  const pendingActions = useAppSelector((state) => state.wishlist.pendingActions);

  const initializedRef = useRef(false);

  /* ── Initialize wishlist on mount (authenticated users only) ────────── */
  useEffect(() => {
    if (isAuthenticated && !initializedRef.current) {
      initializedRef.current = true;
      dispatch(fetchWishlist());
    }
  }, [isAuthenticated, dispatch]);

  /* ── Reset on logout ────────────────────────────────────────────────── */
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
        .catch((err) =>
          toast.error(err || "Failed to add item to wishlist"),
        );
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

  /* ── Toggle item (add if not present, remove if present) ───────────── */
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
    (productId: string) => {
      return items.some((item) => item.id === productId);
    },
    [items],
  );

  return {
    wishlistItems: items,
    loading,
    error,
    pendingActions,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
  };
}
