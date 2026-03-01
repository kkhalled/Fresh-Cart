"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../../cart/hooks/useCart";
import WishlistHeader from "../components/WishlistHeader";
import WishlistCard from "../components/WishlistCard";
import WishlistEmptyState from "../components/WishlistEmptyState";
import WishlistSkeleton from "../components/WishlistSkeleton";

/* ─── Stagger wrapper for fade + slide-up entrance ─────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   WishlistScreen
   Fetches wishlist on mount, shows skeleton while loading, uses Framer Motion
   for animations, displays empty state when no items.
   ═══════════════════════════════════════════════════════════════════════════ */
export default function WishlistScreen() {
  const {
    wishlistItems,
    loading,
    pendingActions,
    removeItem,
  } = useWishlist();

  const { addItem: addToCart, pendingActions: cartPendingActions } = useCart();

  const handleRemove = useCallback(
    (id: string) => {
      removeItem(id);
    },
    [removeItem],
  );

  const handleAddToCart = useCallback(
    (id: string) => {
      const item = wishlistItems.find((i) => i.id === id);
      if (item) {
        addToCart(id, {
          title: item.title,
          imageCover: item.imageCover,
          category: item.category,
          price: item.priceAfterDiscount ?? item.price,
          ratingsAverage: item.ratingsAverage,
          ratingsQuantity: item.ratingsQuantity,
        });
      }
    },
    [wishlistItems, addToCart],
  );

  /* ── Loading state — skeleton ──────────────────────────────────────── */
  if (loading && wishlistItems.length === 0) {
    return <WishlistSkeleton />;
  }

  /* ── Empty state ───────────────────────────────────────────────────── */
  if (!loading && wishlistItems.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container py-8 sm:py-10 lg:py-12"
      >
        <WishlistEmptyState />
      </motion.section>
    );
  }

  /* ── Main wishlist view ────────────────────────────────────────────── */
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container py-8 sm:py-10 lg:py-12 max-w-7xl"
    >
      <motion.div variants={itemVariants}>
        <WishlistHeader itemCount={wishlistItems.length} />
      </motion.div>

      <AnimatePresence mode="popLayout">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          layout
        >
          {wishlistItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layout
              exit="exit"
            >
              <WishlistCard
                item={item}
                onRemove={handleRemove}
                onAddToCart={handleAddToCart}
                isPending={!!pendingActions[item.id]}
                isAddingToCart={!!cartPendingActions[item.id]}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
