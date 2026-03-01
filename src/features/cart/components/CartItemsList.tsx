"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CartItem } from "../types/cart.types";
import CartItemCard from "./CartItemCard";

interface CartItemsListProps {
  items: CartItem[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  pendingActions?: Record<string, boolean>;
}

export default function CartItemsList({
  items,
  onIncrement,
  onDecrement,
  onRemove,
  pendingActions = {},
}: CartItemsListProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-8 sm:px-6"
      role="list"
      aria-label="Cart items"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((item, index) => (
          <motion.div
            key={item.productId}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              x: -300,
              transition: { duration: 0.25, ease: "easeIn" },
            }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              layout: { type: "spring", stiffness: 500, damping: 35 },
            }}
            role="listitem"
            className={
              index < items.length - 1 ? "border-b border-gray-100" : ""
            }
          >
            <CartItemCard
              item={item}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onRemove={onRemove}
              isPending={!!pendingActions[item.productId]}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
