"use client";

import { useEffect, useState, useMemo } from "react";
import { Product } from "../types/products.types";
import { getProducts } from "../server/products.action";
import getAllCategories from "@/src/features/categories/server/category.action";
import { ApiCategoryItem } from "@/src/features/categories/types/category.type";
import ProductCard from "../components/ProductCard";
import FilterSidebar, { FiltersState } from "../components/FilterSidebar";
import ShopHeader from "../components/ShopHeader";
import CategoryQuickFilters from "../components/CategoryQuickFilters";
import ShopSkeleton from "../components/ShopSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PAGE_SIZE = 12;

type SortOption = "popular" | "price-asc" | "price-desc" | "newest";

const DEFAULT_FILTERS: FiltersState = {
  categories: [],
  minPrice: "",
  maxPrice: "",
  minRating: null,
  inStockOnly: false,
};

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort(
        (a, b) =>
          (a.priceAfterDiscount ?? a.price) - (b.priceAfterDiscount ?? b.price)
      );
    case "price-desc":
      return copy.sort(
        (a, b) =>
          (b.priceAfterDiscount ?? b.price) - (a.priceAfterDiscount ?? a.price)
      );
    case "newest":
      return copy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    default:
      return copy.sort((a, b) => (b.ratingsAverage ?? 0) - (a.ratingsAverage ?? 0));
  }
}

function applyFilters(
  products: Product[],
  filters: FiltersState,
  activePillId: string
): Product[] {
  return products.filter((p) => {
    const effectivePrice = p.priceAfterDiscount ?? p.price;

    // Category filter: sidebar checkboxes take priority over pill
    if (filters.categories.length > 0) {
      if (!filters.categories.includes(p.category._id)) return false;
    } else if (activePillId !== "all") {
      if (p.category._id !== activePillId) return false;
    }

    // Price range
    if (filters.minPrice !== "" && !isNaN(Number(filters.minPrice))) {
      if (effectivePrice < Number(filters.minPrice)) return false;
    }
    if (filters.maxPrice !== "" && !isNaN(Number(filters.maxPrice))) {
      if (effectivePrice > Number(filters.maxPrice)) return false;
    }

    // Rating
    if (filters.minRating !== null) {
      if (p.ratingsAverage < filters.minRating) return false;
    }

    // In-stock only
    if (filters.inStockOnly && p.quantity === 0) return false;

    return true;
  });
}

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ApiCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("popular");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [activePillId, setActivePillId] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.allSettled([
          getProducts(),
          getAllCategories(),
        ]);

        if (productsRes.status === "fulfilled") {
          setProducts(productsRes.value.data);
        } else {
          setError("Failed to load products. Please try again.");
        }

        if (categoriesRes.status === "fulfilled") {
          setCategories(categoriesRes.value.data);
        }
      } finally {
        setLoading(false);
        setCategoriesLoading(false);
      }
    }
    fetchData();
  }, []);

  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  const filtered = useMemo(
    () => applyFilters(sorted, filters, activePillId),
    [sorted, filters, activePillId]
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (newSort: SortOption) => {
    setSort(newSort);
    setPage(1);
  };

  const handleFiltersChange = (newFilters: FiltersState) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handlePillSelect = (id: string) => {
    setActivePillId(id);
    // Clear sidebar category checkboxes when a pill is picked so they don't conflict
    setFilters((prev) => ({ ...prev, categories: [] }));
    setPage(1);
  };

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
      <ShopHeader total={filtered.length} onSortChange={handleSort} sortValue={sort} />

      {/* Category Quick Filters */}
      <CategoryQuickFilters
        categories={categories}
        loading={categoriesLoading}
        activeId={activePillId}
        onSelect={handlePillSelect}
      />

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10">
        {/* Sidebar */}
        <FilterSidebar
          categories={categories}
          filters={filters}
          onChange={handleFiltersChange}
        />

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
                onClick={() => {
                  setFilters(DEFAULT_FILTERS);
                  setActivePillId("all");
                  setPage(1);
                }}
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
