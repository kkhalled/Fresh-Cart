import { useEffect, useState } from "react";
import { Product } from "../types/products.types";
import { getProducts } from "../server/products.action";

interface UseRelatedProductsArgs {
  categoryId: string;
  currentProductId: string;
}

export function useRelatedProducts({ categoryId, currentProductId }: UseRelatedProductsArgs) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        setLoading(true);
        const response = await getProducts();
        const filtered = response.data.filter(
          (product) =>
            product.category._id === categoryId &&
            product._id !== currentProductId
        );
        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRelatedProducts();
  }, [categoryId, currentProductId]);

  return { relatedProducts, loading };
}
