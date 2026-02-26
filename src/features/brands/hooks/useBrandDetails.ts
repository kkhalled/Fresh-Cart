import { useEffect, useState, useMemo } from "react";
import { Brand } from "../types/brand.type";
import { Product } from "../../products/types/products.types";
import { getBrandById } from "../server/brand.action";
import { getProducts } from "../../products/server/products.action";

export function useBrandDetails(brandId: string) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBrandAndProducts() {
      try {
        setLoading(true);
        setError(null);

        const [brandResponse, productsResponse] = await Promise.all([
          getBrandById(brandId),
          getProducts(),
        ]);

        setBrand(brandResponse.data);
        setAllProducts(productsResponse.data);
      } catch (err) {
        console.error("Failed to fetch brand details:", err);
        setError("Failed to load brand details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchBrandAndProducts();
  }, [brandId]);

  const products = useMemo(
    () => allProducts.filter((product) => product.brand._id === brandId),
    [allProducts, brandId]
  );

  const avgRating = useMemo(() => {
    if (products.length === 0) return 0;
    return +(products.reduce((sum, p) => sum + p.ratingsAverage, 0) / products.length).toFixed(1);
  }, [products]);

  const startingPrice = useMemo(
    () => products.length > 0
      ? Math.min(...products.map((p) => p.priceAfterDiscount || p.price))
      : 0,
    [products]
  );

  return { brand, products, loading, error, avgRating, startingPrice };
}
