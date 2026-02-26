'use client';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTruck, faShieldAlt, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../types/products.types";

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Product Details' },
    { id: 'reviews', label: 'Reviews (8)' },
    { id: 'shipping', label: 'Shipping & Returns' },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex min-w-max lg:min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 sm:px-6 h-14 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6 lg:p-8">{activeTab === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Product Information */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between gap-4">
                  <span className="text-sm text-gray-600">Brand</span>
                  <span className="text-sm font-medium text-gray-900 text-right">{product.brand.name}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-sm text-gray-600">Category</span>
                  <span className="text-sm font-medium text-gray-900 text-right">{product.category.name}</span>
                </div>
                {product.subcategory && product.subcategory.length > 0 && (
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-gray-600">Subcategory</span>
                    <span className="text-sm font-medium text-gray-900 text-right">
                      {product.subcategory.map((sub) => sub.name).join(', ')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <span className="text-sm text-gray-600">Availability</span>
                  <span className="text-sm font-medium text-gray-900 text-right">{product.quantity} units</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-sm text-gray-600">SKU</span>
                  <span className="text-sm font-medium text-gray-900 text-right">{product.id}</span>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>High quality and fresh products</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Carefully selected and inspected</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Fast and reliable delivery</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>100% satisfaction guaranteed</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Fresh from farm to your door</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Rating Summary */}
            <div>
              <div className="text-center lg:text-left">
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">{product.ratingsAverage}</div>
                <div className="flex justify-center lg:justify-start gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                      key={star}
                      icon={faStar}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Based on {product.ratingsQuantity} reviews</p>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2 sm:gap-3">
                  <span className="text-sm text-gray-600 w-10 sm:w-12">{rating} star</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600"
                      style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Shipping Info Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg bg-green-50 border border-green-200 p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-green-100 shrink-0">
                    <FontAwesomeIcon icon={faTruck} className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Free Shipping</h4>
                    <p className="text-sm text-gray-600">Free standard shipping on orders over $50. Delivery within 3-5 business days.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-green-50 border border-green-200 p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-green-100 shrink-0">
                    <FontAwesomeIcon icon={faRotateLeft} className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Easy Returns</h4>
                    <p className="text-sm text-gray-600">30-day return policy. If you're not satisfied, return it for a full refund.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer Protection */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gray-200 shrink-0">
                  <FontAwesomeIcon icon={faShieldAlt} className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Buyer Protection</h4>
                  <p className="text-sm text-gray-600">
                    Your purchase is protected. We guarantee secure payment processing and product authenticity. 
                    If there are any issues with your order, our customer support team is here to help.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
