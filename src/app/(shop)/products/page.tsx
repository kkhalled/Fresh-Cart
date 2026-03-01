import { Suspense } from "react";
import ProductsScreen from "@/src/features/products/screens/Products.screen";
import ShopSkeleton from "@/src/features/products/components/ShopSkeleton";

export default function ProductPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ProductsScreen />
    </Suspense>
  );
}

