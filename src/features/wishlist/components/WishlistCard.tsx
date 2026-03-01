"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import type { WishlistItem } from "../types/wishlist.types";

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
  isPending: boolean;
  isAddingToCart: boolean;
}

const WishlistCard = memo(
  ({
    item,
    onRemove,
    onAddToCart,
    isPending,
    isAddingToCart,
  }: WishlistCardProps) => {
    const {
      id,
      title,
      imageCover,
      price,
      priceAfterDiscount,
      ratingsAverage,
      ratingsQuantity,
      category,
    } = item;

    const discountPercentage = priceAfterDiscount
      ? Math.round(((price - priceAfterDiscount) / price) * 100)
      : 0;

    const truncateTitle = (text: string, maxLength: number = 55) => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength).trim() + "...";
    };

    return (
      <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Link href={`/products/${id}`} className="relative block w-full h-full">
            <Image
              src={imageCover}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 280px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </div>
          )}

          {/* Remove Button */}
          <div className="absolute top-2 right-2">
            <button
              onClick={() => onRemove(id)}
              disabled={isPending}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 hover:text-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Remove ${title} from wishlist`}
            >
              <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col grow">
          {/* Category */}
          <p className="text-xs text-gray-500 mb-1">{category}</p>

          {/* Title */}
          <Link href={`/products/${id}`}>
            <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-10 leading-tight mb-2 hover:text-green-600 transition-colors">
              {truncateTitle(title)}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={`w-3 h-3 ${
                  i < Math.floor(ratingsAverage)
                    ? "text-yellow-400"
                    : "text-gray-200"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              {ratingsAverage.toFixed(1)} ({ratingsQuantity})
            </span>
          </div>

          {/* Price and Add to Cart Button */}
          <div className="flex items-center justify-between mt-auto gap-2">
            <div className="flex flex-col">
              {priceAfterDiscount ? (
                <>
                  <span className="text-base font-bold text-green-600">
                    ${priceAfterDiscount}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ${price}
                  </span>
                </>
              ) : (
                <span className="text-base font-bold text-gray-900">
                  ${price}
                </span>
              )}
            </div>

            <button
              onClick={() => onAddToCart(id)}
              disabled={isAddingToCart}
              className="flex items-center gap-1.5 px-3 py-2 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? (
                <>
                  <svg
                    className="animate-spin h-3.5 w-3.5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faShoppingCart} className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

WishlistCard.displayName = "WishlistCard";

export default WishlistCard;
