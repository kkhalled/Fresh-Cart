'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faTruck,
  faRotateLeft,
  faMinus,
  faPlus,
  faCartShopping,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { ProductDetailsResponse } from "../../types/products.types";
import { useState } from "react";

export default function ProductInfo({
  product,
}: {
  product: ProductDetailsResponse;
}) {
  const { data } = product;
  const isInStock = data.quantity > 0;
  const isLowStock = data.quantity > 0 && data.quantity <= 10;
  const hasSale =
    data.priceAfterDiscount && data.priceAfterDiscount < data.price;
  const salePercentage = hasSale
    ? Math.round(((data.price - data.priceAfterDiscount!) / data.price) * 100)
    : 0;

  const [quantity, setQuantity] = useState(1);
  
  // Calculate prices
  const unitPrice = hasSale ? data.priceAfterDiscount! : data.price;
  const totalPrice = (unitPrice * quantity).toFixed(2);
  const originalTotalPrice = hasSale ? (data.price * quantity).toFixed(2) : null;

  // Quantity handlers
  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, data.quantity));
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* 1. Stock Badge and Icons Row */}
      <div className="mb-4 flex items-center justify-between">
        {isInStock ? (
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
              isLowStock
                ? "bg-orange-100 text-orange-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {isLowStock ? "Low Stock" : "In Stock"}
          </span>
        ) : (
          <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
            Out of Stock
          </span>
        )}
        <div className="flex items-center gap-3">
          <button className="text-gray-600 hover:text-green-600">
            <FontAwesomeIcon icon={faShareNodes} className="h-5 w-5" />
          </button>
          <button className="text-gray-600 hover:text-red-500">
            <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 2. Product Title */}
      <h1 className="mb-4 text-3xl font-semibold text-gray-900">
        {data.title}
      </h1>

      {/* Brand, Category & Subcategory Info */}
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
        {data.brand && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Brand:</span>
            <span className="text-green-600 hover:text-green-700">
              {data.brand.name}
            </span>
          </div>
        )}
        {data.category && (
          <>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Category:</span>
              <span className="text-green-600 hover:text-green-700">
                {data.category.name}
              </span>
            </div>
          </>
        )}
        {data.subcategory && data.subcategory.length > 0 && (
          <>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Subcategory:</span>
              <span className="text-green-600 hover:text-green-700">
                {data.subcategory.map((sub) => sub.name).join(", ")}
              </span>
            </div>
          </>
        )}
      </div>

      {/* 3. Rating Row */}
      <div className="mb-6 flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={faStar}
              className="h-4 w-4 text-yellow-400"
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">
          {data.ratingsAverage} ({data.ratingsQuantity} reviews)
        </span>
      </div>

      {/* 4. Price Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl font-semibold text-gray-700">Unit Price:</span>
          <span className="text-2xl font-bold text-gray-900">
            ${unitPrice}
          </span>
          {hasSale && (
            <>
              <span className="text-lg text-gray-400 line-through">
                ${data.price}
              </span>
              <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                -{salePercentage}%
              </span>
            </>
          )}
        </div>
        
        {/* Total Price Display */}
        <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Price</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-green-700">
                  ${totalPrice}
                </span>
                {hasSale && originalTotalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${originalTotalPrice}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Quantity</p>
              <p className="text-2xl font-bold text-green-600">{quantity}</p>
            </div>
          </div>
          {hasSale && (
            <div className="mt-2 pt-2 border-t border-green-200">
              <p className="text-sm font-medium text-green-700">
                You save ${(parseFloat(originalTotalPrice!) - parseFloat(totalPrice)).toFixed(2)} on this order!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200"></div>

      {/* 5. Description */}
      <p className="mb-6 leading-relaxed text-gray-600">{data.description}</p>

      {/* 6. Availability Status */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            Availability:
          </span>
          {isInStock ? (
            isLowStock ? (
              <span className="text-sm text-orange-600 font-medium">
                Only {data.quantity} available
              </span>
            ) : (
              <span className="text-sm text-green-600 font-medium">
                {data.quantity} units available
              </span>
            )
          ) : (
            <span className="text-sm text-red-600 font-medium">
              Out of stock
            </span>
          )}
        </div>
      </div>

      {/* 7. Quantity Selector */}
      {isInStock && (
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Select Quantity
          </label>
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center rounded-lg border border-gray-200  bg-white shadow-sm">
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className={`px-5 py-3 transition-colors rounded-l-lg ${
                  quantity <= 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
              </button>
              <span className="w-16 text-center text-lg font-bold text-gray-900 border-x-1 border-gray-300 py-3">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                disabled={quantity >= data.quantity}
                className={`px-5 py-3 transition-colors rounded-r-lg ${
                  quantity >= data.quantity
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
              </button>
            </div>
            {isLowStock && (
              <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
                <span className="text-sm text-orange-700 font-medium">
                  ⚠️ Hurry! Only {data.quantity} left
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. Action Buttons */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <button
          disabled={!isInStock}
          className={`flex items-center justify-center gap-2 rounded-lg py-3 text-base font-medium transition-colors ${
            isInStock
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <FontAwesomeIcon icon={faCartShopping} className="h-4 w-4" />
          {isInStock ? "Add to Cart" : "Out of Stock"}
        </button>
        <button
          disabled={!isInStock}
          className={`rounded-lg py-3 text-base font-medium transition-colors ${
            isInStock
              ? "border border-gray-300 text-gray-800 hover:bg-gray-50"
              : "border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
          }`}
        >
          Buy Now
        </button>
      </div>

      {/* 9. Bottom Info Boxes */}
      <div className="space-y-3">
        <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
            <FontAwesomeIcon
              icon={faTruck}
              className="h-5 w-5 text-green-600"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Free Delivery</p>
            <p className="text-sm text-gray-600">
              Free shipping on orders over $50
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
            <FontAwesomeIcon
              icon={faRotateLeft}
              className="h-5 w-5 text-green-600"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">30 Days Return</p>
            <p className="text-sm text-gray-600">
              Satisfaction guaranteed or money back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
