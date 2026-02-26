"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../products/types/products.types";
import ProductCard from "../../products/components/ProductCard";
import { getProducts } from "../../products/server/products.action";

interface ProductWithDiscount extends Product {
  discountPercentage: number;
}

// Skeleton Loader Component
const DealsSkeleton = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="shrink-0 w-56 bg-white rounded-xl overflow-hidden shadow-sm"
          >
            <div className="aspect-square bg-gray-200 animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function DealsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const dealProducts = useMemo(() => {
    // Filter products with discount
    const productsWithDiscount = products
      .filter((product) => product.priceAfterDiscount)
      .map((product) => ({
        ...product,
        discountPercentage: Math.round(
          ((product.price - (product.priceAfterDiscount || 0)) /
            product.price) *
            100
        ),
      })) as ProductWithDiscount[];

    // Sort by highest discount and take top 6
    return productsWithDiscount
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, 6);
  }, [products]);

  // Show loading skeleton
  if (loading) {
    return <DealsSkeleton />;
  }

  // If no deals exist, return null
  if (dealProducts.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
            Deals of the Day
          </h2>
          <p className="text-xs text-gray-500">
            Offers end in:{" "}
            <span className="font-mono text-red-600 font-semibold">
              23:12:15
            </span>
          </p>
        </div>

        <Link
          href="/deals"
          className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold transition-colors duration-300 group text-sm"
        >
          <span>View All Deals</span>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Horizontal Scrollable Products */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {dealProducts.map((product, index) => (
          <div key={product._id} className="shrink-0 w-56">
            <ProductCard product={product} priority={index < 4} />
          </div>
        ))}
      </div>
    </section>
  );
}
