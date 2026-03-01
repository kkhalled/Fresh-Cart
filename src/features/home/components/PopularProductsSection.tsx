"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../products/types/products.types";
import ProductCard from "../../products/components/ProductCard";

interface PopularProductsSectionProps {
  products: Product[];
}

export default function PopularProductsSection({ products }: PopularProductsSectionProps) {
  const popularProducts = useMemo(
    () =>
      products
        .filter((p) => p.ratingsAverage > 0)
        .sort((a, b) => {
          if (b.ratingsAverage !== a.ratingsAverage) return b.ratingsAverage - a.ratingsAverage;
          return b.ratingsQuantity - a.ratingsQuantity;
        })
        .slice(0, 18),
    [products]
  );

  if (popularProducts.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Popular Products</h2>
          <p className="text-xs text-gray-500">Top rated products loved by customers</p>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button className="popular-prev w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors" aria-label="Previous">
              <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
            </button>
            <button className="popular-next w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors" aria-label="Next">
              <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
            </button>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold transition-colors group text-sm">
            <span>View All</span>
            <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      <div className="[&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:!bg-green-600 [&_.swiper-pagination-bullet-active]:!w-5 [&_.swiper-pagination-bullet-active]:rounded-full">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{ nextEl: ".popular-next", prevEl: ".popular-prev" }}
          
          speed={400}
          spaceBetween={16}
          slidesPerView={2}
          slidesPerGroup={2}
          breakpoints={{ 640: { slidesPerView: 3, slidesPerGroup: 3 }, 1024: { slidesPerView: 6, slidesPerGroup: 6 } }}
          className="pb-10"
        >
          {popularProducts.map((product, i) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} priority={i < 6} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}