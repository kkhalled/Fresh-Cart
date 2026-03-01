"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInView } from "@/src/hooks/useInView";
import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../types/products.types";
import { useProductCardActions } from "../hooks/useProductCardActions";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  showDealBadge?: boolean;
}

const ProductCard = memo(
  ({ product, priority = false, showDealBadge = false }: ProductCardProps) => {
    const { ref, inView } = useInView();
    const {
      _id,
      title,
      imageCover,
      price,
      priceAfterDiscount,
      ratingsAverage,
      ratingsQuantity,
      category,
    } = product;

    const {
      addToCart,
      isAddToCartPending: isAddPending,
      toggleWishlist,
      isInWishlist: isInWishlistState,
      isWishlistPending,
    } = useProductCardActions(_id);

    const savings = priceAfterDiscount
      ? (price - priceAfterDiscount).toFixed(2)
      : null;

    const discountPercentage = priceAfterDiscount
      ? Math.round(((price - priceAfterDiscount) / price) * 100)
      : 0;

    const truncateTitle = (text: string, maxLength: number = 55) => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength).trim() + "...";
    };

    const handleAddToCart = (e: React.MouseEvent) => {
      e.preventDefault();
      addToCart({
        title,
        imageCover,
        category: category.name,
        price: priceAfterDiscount ?? price,
        ratingsAverage,
        ratingsQuantity,
      });
    };

    const handleWishlist = (e: React.MouseEvent) => {
      e.preventDefault();
      toggleWishlist();
    };

    return (
      <div
        ref={ref}
        className={`group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full w-full ${
          inView ? "animate-fade-in-up-sm" : "opacity-0"
        }`}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Link
            href={`/products/${_id}`}
            className="relative block w-full h-full"
          >
            <Image
              src={imageCover}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 280px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
            />
          </Link>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </div>
          )}

          {/* Deal savings badge — only shown on Deals page */}
          {showDealBadge && savings && (
            <div className="absolute bottom-2 left-2 bg-green-600/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
              Save ${savings}
            </div>
          )}

          {/* Action Buttons - Right Side */}
          <div className="absolute top-2 right-2 flex flex-col gap-1.5">
            <button
              onClick={handleWishlist}
              disabled={isWishlistPending}
              className={`w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-500 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                isInWishlistState ? "bg-red-50 text-red-500" : ""
              }`}
              aria-label={
                isInWishlistState
                  ? `Remove ${title} from wishlist`
                  : `Add ${title} to wishlist`
              }
            >
              <FontAwesomeIcon
                icon={isInWishlistState ? faHeartSolid : faHeartRegular}
                className="w-3.5 h-3.5"
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col grow">
          {/* Category */}
          <p className="text-xs text-gray-500 mb-1">{category.name}</p>

          {/* Title */}
          <Link href={`/products/${_id}`}>
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
              {ratingsAverage.toFixed()} ({ratingsQuantity})
            </span>
          </div>

          {/* Price and Add Button */}
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

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAddPending}
              className={`px-3 py-2 border border-green-500 text-green-600 hover:bg-green-600 hover:text-white rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 font-medium text-xs whitespace-nowrap ${
                isAddPending ? "opacity-50 pointer-events-none" : ""
              }`}
              aria-label={`Add ${title} to cart`}
            >
              {isAddPending ? (
                <svg
                  className="w-3 h-3 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <FontAwesomeIcon icon={faShoppingCart} className="w-3 h-3" />
              )}
              <span>{isAddPending ? "Adding..." : "Add"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
