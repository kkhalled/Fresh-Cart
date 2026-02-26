"use client";

import PromoBannerCard from "./PromoBannerCard";

interface PromoBanner {
  id: string;
  gradientFrom: string;
  gradientTo: string;
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

const promoBanners: PromoBanner[] = [
  {
    id: "promo-1",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
    subtitle: "Organic Vegetables",
    title: "Get up to 30% off on organic vegetables",
    description: "Fresh from farm to your doorstep",
    buttonText: "Shop Now",
    buttonHref: "/categories/vegetables",
  },
  {
    id: "promo-2",
    gradientFrom: "from-orange-400",
    gradientTo: "to-rose-500",
    subtitle: "Fresh Dairy Products",
    title: "Buy 2 get 1 free on all dairy products",
    description: "Premium quality milk, cheese & more",
    buttonText: "Shop Now",
    buttonHref: "/categories/dairy",
  },
];

export default function PromoBannersSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PromoBannerCard
          {...promoBanners[0]}
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
        />
        <PromoBannerCard
          {...promoBanners[1]}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
        />
      </div>
    </section>
  );
}
