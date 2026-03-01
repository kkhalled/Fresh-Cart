"use client";

import { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useCart } from "../hooks/useCart";
import type { CartItem } from "../types/cart.types";
import CartPageLayout from "../components/CartPageLayout";
import CartHeader from "../components/CartHeader";
import CartItemsList from "../components/CartItemsList";
import OrderSummary from "../components/OrderSummary";
import CartEmptyState from "../components/CartEmptyState";
import CartSkeleton from "../components/CartSkeleton";

/* ─── Tax rate ─────────────────────────────────────────────────────────── */
const TAX_RATE = 0.065;

/* ─── Stagger wrapper for fade + slide-up entrance ─────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   CartScreen
   Connects useCart → pure components. All domain behavior lives in the
   hook; this file only orchestrates layout, loading states, and derived
   values (subtotal / tax / total).
   ═══════════════════════════════════════════════════════════════════════════ */
export default function CartScreen() {
  const {
    items,
    total,
    numOfCartItems,
    loading,
    pendingActions,
    updateQuantity,
    removeItem,
    mode,
    clearAllItems,
  } = useCart();

  /* ── Handlers bridging CartItem id → useCart productId ─────────────── */
  const handleIncrement = useCallback(
    (id: string) => {
      const item = items.find((i: CartItem) => i.productId === id);
      if (item) updateQuantity(item.productId, item.quantity + 1);
    },
    [items, updateQuantity],
  );

  const handleDecrement = useCallback(
    (id: string) => {
      const item = items.find((i: CartItem) => i.productId === id);
      if (item) updateQuantity(item.productId, item.quantity - 1);
    },
    [items, updateQuantity],
  );

  const handleRemove = useCallback(
    (id: string) => {
      removeItem(id);
    },
    [removeItem],
  );

  /* ── Derived values ────────────────────────────────────────────────── */
  const subtotal = useMemo(
    () => items.reduce((acc, item: CartItem) => acc + item.price * item.quantity, 0),
    [items],
  );

  const shipping = 0;
  const discount = 0;
  const taxable = Math.max(subtotal - discount, 0);
  const tax = taxable * TAX_RATE;
  const finalTotal = taxable + tax + shipping;
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  /* ── Loading state — skeleton ──────────────────────────────────────── */
  if (loading && items.length === 0) {
    return <CartSkeleton />;
  }

  /* ── Empty state ───────────────────────────────────────────────────── */
  if (!loading && items.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container py-8 sm:py-10 lg:py-12"
      >
        <CartEmptyState />
      </motion.section>
    );
  }

  /* ── Main cart view ────────────────────────────────────────────────── */
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <CartPageLayout
        header={
          <motion.div variants={sectionVariants}>
            <CartHeader itemCount={itemCount} onClearCart={clearAllItems} />
          </motion.div>
        }
        cartItems={
          <motion.div variants={sectionVariants}>
            <CartItemsList
              items={items}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
              pendingActions={pendingActions}
            />
          </motion.div>
        }
        summary={
          <motion.div variants={sectionVariants}>
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              tax={tax}
              total={finalTotal}
              itemCount={itemCount}
              coupon={null}
              isGuest={mode === "guest"}
            />
          </motion.div>
        }
      />
    </motion.div>
  );
}
