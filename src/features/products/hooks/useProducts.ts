import { useEffect, useState, useMemo, useCallback } from "react";
import { Product } from "../types/products.types";
import { getProducts } from "../server/products.action";
import getAllCategories from "@/src/features/categories/server/category.action";
import { ApiCategoryItem } from "@/src/features/categories/types/category.type";
import { FiltersState } from "../components/FilterSidebar";

export type ShopSortOption = "popular" | "price-asc" | "price-desc" | "newest";

const PAGE_SIZE = 12;

const DEFAULT_FILTERS: FiltersState = {
  categories: [],
  minPrice: "",
  maxPrice: "",
  minRating: null,
  inStockOnly: false,
};

function sortProducts(products: Product[], sort: ShopSortOption): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort(
        (a, b) => (a.priceAfterDiscount ?? a.price) - (b.priceAfterDiscount ?? b.price)
      );
    case "price-desc":
      return copy.sort(
        (a, b) => (b.priceAfterDiscount ?? b.price) - (a.priceAfterDiscount ?? a.price)
      );
    case "newest":
      return copy.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ApiCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<ShopSortOption>("popular");
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

  const handleSort = useCallback((newSort: ShopSortOption) => {
    setSort(newSort);
    setPage(1);
  }, []);

  const handleFiltersChange = useCallback((newFilters: FiltersState) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const handlePillSelect = useCallback((id: string) => {
    setActivePillId(id);
    setFilters((prev) => ({ ...prev, categories: [] }));
    setPage(1);
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setActivePillId("all");
    setPage(1);
  }, []);

  return {
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
    totalFiltered: filtered.length,
    setPage,
    handleSort,
    handleFiltersChange,
    handlePillSelect,
    clearAllFilters,
  };
}
