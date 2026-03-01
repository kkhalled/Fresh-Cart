"use client";

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import ShopHeader from "../components/ShopHeader";
import CategoryQuickFilters from "../components/CategoryQuickFilters";
import ShopSkeleton from "../components/ShopSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faSlidersH,
  faTimes,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useProducts } from "../hooks/useProducts";

export default function ProductsScreen() {
  const router = useRouter();
  const {
    products: paginated,
    categories,
    loading,
    categoriesLoading,
    error,
    sort,
    filters,
    activePillId,
    page,
    totalPages,
    totalFiltered,
    urlQuery,
    setPage,
    handleSort,
    handleFiltersChange,
    handlePillSelect,
    clearAllFilters,
  } = useProducts();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const activeFilterCount =
    filters.categories.length +
    (filters.minPrice !== "" ? 1 : 0) +
    (filters.maxPrice !== "" ? 1 : 0) +
    (filters.minRating !== null ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  if (loading) return <ShopSkeleton />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <ShopHeader total={totalFiltered} onSortChange={handleSort} sortValue={sort} />

      {/* Search query banner */}
      {urlQuery && (
        <div className="flex items-center gap-2 mb-4 px-1">
          <FontAwesomeIcon icon={faSearch} className="w-3.5 h-3.5 text-green-600 shrink-0" />
          <p className="text-sm text-gray-600">
            Results for{" "}
            <span className="font-semibold text-gray-900">&ldquo;{urlQuery}&rdquo;</span>
            <span className="text-gray-400 ml-1">({totalFiltered} items)</span>
          </p>
          <button
            onClick={() => router.replace("/products")}
            className="ml-auto flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors border border-red-200 rounded-full px-2.5 py-1 hover:bg-red-50"
          >
            <FontAwesomeIcon icon={faTimes} className="w-2.5 h-2.5" />
            Clear search
          </button>
        </div>
      )}

      {/* Category Quick Filters */}
      <CategoryQuickFilters
        categories={categories}
        loading={categoriesLoading}
        activeId={activePillId}
        onSelect={handlePillSelect}
      />

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium shadow-sm hover:border-green-500 hover:text-green-600 transition-colors"
        >
          <FontAwesomeIcon icon={faSlidersH} className="w-4 h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-1 bg-green-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-x-0 top-0 h-dvh z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          {/* Drawer panel */}
          <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-2xl flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faSlidersH} className="text-green-600 w-4 h-4" />
                <span className="font-bold text-gray-900 text-base">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-green-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label="Close filters"
              >
                <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
              </button>
            </div>
            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto p-5">
              <FilterSidebar
                categories={categories}
                filters={filters}
                onChange={handleFiltersChange}
                bare
              />
            </div>
            {/* Drawer footer */}
            <div className="px-5 py-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => {
                  clearAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Show Results ({totalFiltered})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10">
        {/* Sidebar — desktop only */}
        <div className="hidden lg:block">
          <FilterSidebar
            categories={categories}
            filters={filters}
            onChange={handleFiltersChange}
          />
        </div>

        {/* Content */}
        <div>
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </div>
              <p className="text-gray-700 font-semibold text-base">No Products Found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search criteria.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginated.map((product, i) => (
                <ProductCard key={product._id} product={product} priority={i < 4} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pg = i + 1;
                const isNear =
                  pg === 1 ||
                  pg === totalPages ||
                  Math.abs(pg - page) <= 1;
                if (!isNear) {
                  if (pg === 2 || pg === totalPages - 1) {
                    return (
                      <span
                        key={pg}
                        className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm"
                      >
                        …
                      </span>
                    );
                  }
                  return null;
                }
                return (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                      pg === page
                        ? "bg-green-600 border-green-600 text-white"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {pg}
                  </button>
                );
              })}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
