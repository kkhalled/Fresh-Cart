"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faFire,
  faTag,
  faArrowDownWideShort,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";
import { Product } from "../types/products.types";
import { getProducts } from "../server/products.action";
import ProductCard from "../components/ProductCard";
import DealCardSkeleton from "../components/DealCardSkeleton";

type SortOption = "discount-desc" | "price-asc" | "price-desc" | "rating";

function sortDeals(products: Product[], sort: SortOption): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => (a.priceAfterDiscount ?? a.price) - (b.priceAfterDiscount ?? b.price));
    case "price-desc":
      return copy.sort((a, b) => (b.priceAfterDiscount ?? b.price) - (a.priceAfterDiscount ?? a.price));
    case "rating":
      return copy.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
    default:
      // Sort by highest discount %
      return copy.sort((a, b) => {
        const discA = a.priceAfterDiscount ? ((a.price - a.priceAfterDiscount) / a.price) * 100 : 0;
        const discB = b.priceAfterDiscount ? ((b.price - b.priceAfterDiscount) / b.price) * 100 : 0;
        return discB - discA;
      });
  }
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "discount-desc", label: "Biggest Discount" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function DealsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("discount-desc");

  useEffect(() => {
    async function fetchDeals() {
      try {
        const res = await getProducts();
        // Only products that have a sale price
        setProducts(res.data.filter((p) => p.priceAfterDiscount && p.priceAfterDiscount < p.price));
      } catch {
        setError("Failed to load deals. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchDeals();
  }, []);

  const deals = useMemo(() => sortDeals(products, sort), [products, sort]);

  const totalSavings = useMemo(
    () => deals.reduce((acc, p) => acc + (p.price - (p.priceAfterDiscount ?? p.price)), 0),
    [deals]
  );

  const avgDiscount = useMemo(() => {
    if (deals.length === 0) return 0;
    const sum = deals.reduce((acc, p) => {
      return acc + (p.priceAfterDiscount ? Math.round(((p.price - p.priceAfterDiscount) / p.price) * 100) : 0);
    }, 0);
    return Math.round(sum / deals.length);
  }, [deals]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-green-700 via-green-600 to-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <FontAwesomeIcon icon={faBolt} className="w-3.5 h-3.5 text-yellow-300" />
              Limited Time Offers
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-3 tracking-tight">
              Today&apos;s Best Deals
            </h1>
            <p className="text-green-100 text-base sm:text-lg max-w-xl mx-auto">
              Huge savings on hundreds of products. Don&apos;t miss out — grab them before they&apos;re gone!
            </p>
          </motion.div>

          {/* Stats row */}
          {!loading && deals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap justify-center gap-6 mt-8"
            >
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3">
                <FontAwesomeIcon icon={faFire} className="w-4 h-4 text-orange-300" />
                <div>
                  <p className="text-xl font-bold">{deals.length}</p>
                  <p className="text-xs text-green-100">Active Deals</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3">
                <FontAwesomeIcon icon={faPercent} className="w-4 h-4 text-yellow-300" />
                <div>
                  <p className="text-xl font-bold">{avgDiscount}%</p>
                  <p className="text-xs text-green-100">Avg. Discount</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3">
                <FontAwesomeIcon icon={faTag} className="w-4 h-4 text-green-200" />
                <div>
                  <p className="text-xl font-bold">${totalSavings.toFixed(0)}</p>
                  <p className="text-xs text-green-100">Total Savings</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Toolbar */}
        {!loading && !error && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{deals.length}</span> deals
            </p>

            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faArrowDownWideShort} className="w-4 h-4 text-gray-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="border border-gray-300 rounded-lg text-sm text-gray-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <DealCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && deals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
              <FontAwesomeIcon icon={faTag} className="w-8 h-8 text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No Deals Right Now</h2>
            <p className="text-gray-500 text-sm max-w-xs mb-6">
              Check back soon — new deals are added regularly.
            </p>
            <Link
              href="/products"
              className="px-6 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}

        {/* Deals Grid */}
        {!loading && !error && deals.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {deals.map((product, i) => (
              <ProductCard key={product._id} product={product} priority={i < 5} showDealBadge />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
