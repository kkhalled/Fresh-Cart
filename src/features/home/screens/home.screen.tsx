import React from "react";
import Slider from "../components/Slider";
import FeatureHighlights from "../components/FeatureHighlights";
import CategorySection from "../components/CategorySection";

export default function HomeScreen() {
  return (
    <>
      <Slider />
      <FeatureHighlights />
      <CategorySection />
    </>
  );
}
