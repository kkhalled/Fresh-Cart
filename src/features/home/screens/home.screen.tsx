import React from "react";
import Slider from "../components/Slider";
import FeatureHighlights from "../components/FeatureHighlights";
import CategorySection from "../components/CategorySection";
import PromoBannersSection from "../components/PromoBannersSection";
import DealsSection from "../components/DealsSection";
import PopularProductsSection from "../components/PopularProductsSection";
import { getProducts } from "../../products/server/products.action";
import { Product } from "../../products/types/products.types";

export default async function HomeScreen() {
  let products: Product[] = [];
  try {
    const res = await getProducts();
    products = res.data;
  } catch {
    // degrade gracefully — sections will show empty state
  }

  return (
    <>
      <Slider />
      <CategorySection />
      <DealsSection products={products} />
      <PromoBannersSection />
      <PopularProductsSection products={products} />
      <FeatureHighlights />
    </>
  );
}
