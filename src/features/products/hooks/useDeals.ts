import { useEffect, useState, useMemo } from "react";
import { Product } from "../types/products.types";
import { getProducts } from "../server/products.action";

export type DealsSortOption = "discount-desc" | "price-asc" | "price-desc" | "rating";

export const DEALS_SORT_OPTIONS: { value: DealsSortOption; label: string }[] = [
  { value: "discount-desc", label: "Biggest Discount" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export const DEALS_PER_PAGE = 10;

function sortDeals(products: Product[], sort: DealsSortOption): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => (a.priceAfterDiscount ?? a.price) - (b.priceAfterDiscount ?? b.price));
    case "price-desc":
      return copy.sort((a, b) => (b.priceAfterDiscount ?? b.price) - (a.priceAfterDiscount ?? a.price));
    case "rating":
      return copy.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
    default:
      return copy.sort((a, b) => {
        const discA = a.priceAfterDiscount ? ((a.price - a.priceAfterDiscount) / a.price) * 100 : 0;
        const discB = b.priceAfterDiscount ? ((b.price - b.priceAfterDiscount) / b.price) * 100 : 0;
        return discB - discA;
      });
  }
}

export function useDeals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<DealsSortOption>("discount-desc");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchDeals() {
      try {
        const res = await getProducts();
        setProducts(
          res.data.filter((p) => p.priceAfterDiscount && p.priceAfterDiscount < p.price)
        );
      } catch {
        setError("Failed to load deals. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchDeals();
  }, []);

  // All deals sorted
  const deals = useMemo(() => sortDeals(products, sort), [products, sort]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(deals.length / DEALS_PER_PAGE));

  const pageDeals = useMemo(() => {
    const start = (page - 1) * DEALS_PER_PAGE;
    return deals.slice(start, start + DEALS_PER_PAGE);
  }, [deals, page]);

  // Reset to page 1 whenever the sort changes
  const handleSetSort = (s: DealsSortOption) => {
    setSort(s);
    setPage(1);
  };

  const totalSavings = useMemo(
    () => deals.reduce((acc, p) => acc + (p.price - (p.priceAfterDiscount ?? p.price)), 0),
    [deals]
  );

  const avgDiscount = useMemo(() => {
    if (deals.length === 0) return 0;
    const sum = deals.reduce((acc, p) => {
      return acc + (p.priceAfterDiscount
        ? Math.round(((p.price - p.priceAfterDiscount) / p.price) * 100)
        : 0);
    }, 0);
    return Math.round(sum / deals.length);
  }, [deals]);

  return {
    deals,
    pageDeals,
    loading,
    error,
    sort,
    setSort: handleSetSort,
    totalSavings,
    avgDiscount,
    page,
    setPage,
    totalPages,
  };
}
