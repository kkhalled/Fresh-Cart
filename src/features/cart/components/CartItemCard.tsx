"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartItem } from "../types/cart.types";
import QuantitySelector from "./QuantitySelector";
import RemoveItemButton from "./RemoveItemButton";

interface CartItemCardProps {
  item: CartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  isPending?: boolean;
}

const StarRating = memo(function StarRating({
  rating,
  count,
}: {
  rating: number;
  count: number;
}) {
  return (
    <div className="flex  items-center gap-1.5 mt-0.5">
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={star <= Math.round(rating) ? "#f59e0b" : "none"}
            stroke="#f59e0b"
            strokeWidth={star <= Math.round(rating) ? 0 : 1.5}
            className="w-3 h-3"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
      <span className="text-xs text-gray-400">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
});

const CartItemCard = memo(function CartItemCard({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  isPending = false,
}: CartItemCardProps) {
  const { id, productId, title, category, price, originalPrice, imageCover, quantity, ratingsAverage, ratingsQuantity } = item;
  const lineTotal = (price * quantity).toFixed(2);
  const hasDiscount = originalPrice > price;

  return (
    <article className="flex gap-4 py-5 ">
      {/* Product image */}
      <Link
        href={`/products/${productId}`}
        className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100"
      >
        <Image
          src={imageCover}
          alt={title}
          width={96}
          height={96}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-1 min-w-0 flex-col gap-2">
        {/* Top row: title + remove */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/products/${productId}`}
              className="text-sm font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 leading-snug"
            >
              {title}
            </Link>
            <p className="text-xs text-gray-400 mt-0.5">{category}</p>
          </div>
          <RemoveItemButton
            onRemove={() => onRemove(productId)}
            label={`Remove ${title}`}
            disabled={isPending}
          />
        </div>

        {/* Star rating */}
        <StarRating rating={ratingsAverage} count={ratingsQuantity} />

        {/* Bottom row: quantity + price */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <QuantitySelector
            quantity={quantity}
            onIncrement={() => onIncrement(productId)}
            onDecrement={() => onDecrement(productId)}
            disabled={isPending}
          />

          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">${lineTotal}</p>
            {hasDiscount && (
              <p className="text-xs text-gray-400 line-through">
                ${(originalPrice * quantity).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
});

export default CartItemCard;
