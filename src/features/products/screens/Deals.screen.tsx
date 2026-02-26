"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faFire,
  faTag,
  faArrowDownWideShort,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";
import { useDeals, DEALS_SORT_OPTIONS, DealsSortOption, DEALS_PER_PAGE } from "../hooks/useDeals";
import ProductCard from "../components/ProductCard";
import DealCardSkeleton from "../components/DealCardSkeleton";
import Pagination from "@/src/components/ui/Pagination";

export default function DealsScreen() {
  const { deals, pageDeals, loading, error, sort, setSort, totalSavings, avgDiscount, page, setPage, totalPages } = useDeals();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-green-700 via-green-600 to-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center animate-fade-in-up" style={{ animationDelay: "0s" }}>
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
          </div>

          {/* Stats row */}
          {!loading && deals.length > 0 && (
            <div
              className="flex flex-wrap justify-center gap-6 mt-8 animate-fade-in-up"
              style={{ animationDelay: "0.15s" }}
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
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Toolbar */}
        {!loading && !error && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {Math.min((page - 1) * DEALS_PER_PAGE + 1, deals.length)}–{Math.min(page * DEALS_PER_PAGE, deals.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">{deals.length}</span> deals
            </p>

            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faArrowDownWideShort} className="w-4 h-4 text-gray-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as DealsSortOption)}
                className="border border-gray-300 rounded-lg text-sm text-gray-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
              >
                {DEALS_SORT_OPTIONS.map((o) => (
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
          <div id="deals-grid">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {pageDeals.map((product, i) => (
                <ProductCard key={product._id} product={product} priority={i < 5} showDealBadge />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              scrollToId="deals-grid"
            />
          </div>
        )}
      </div>
    </div>
  );
}
