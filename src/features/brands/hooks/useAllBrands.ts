import { useEffect, useState, useMemo } from "react";
import { Brand } from "../types/brand.type";
import { getAllBrands } from "../server/brand.action";

export function useAllBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllBrands();
        setBrands(response.data);
      } catch (err) {
        console.error("Failed to fetch brands:", err);
        setError("Failed to load brands. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  const filteredBrands = useMemo(() => {
    if (searchQuery.trim() === "") return brands;
    return brands.filter((brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [brands, searchQuery]);

  return {
    brands: filteredBrands,
    totalBrands: brands.length,
    loading,
    error,
    searchQuery,
    setSearchQuery,
  };
}
