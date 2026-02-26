import React from "react";
import Slider from "../components/Slider";
import FeatureHighlights from "../components/FeatureHighlights";
import CategorySection from "../components/CategorySection";
import PromoBannersSection from "../components/PromoBannersSection";
import DealsSection from "../components/DealsSection";
import PopularProductsSection from "../components/PopularProductsSection";

export default function HomeScreen() {
  return (
    <>
      <Slider />
      <FeatureHighlights />
      <CategorySection />
      <DealsSection />
      <PromoBannersSection/>
      <PopularProductsSection/>
    </>
  );
}
