"use client";

import { useEffect, useMemo, useState } from "react";
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
import { getProducts } from "../../products/server/products.action";

interface ProductWithDiscount extends Product { discountPercentage: number; }

const DealsSkeleton = () => (
  <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex items-center justify-between gap-4 mb-6">
      <div>
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="aspect-square bg-gray-200 animate-pulse" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default function DealsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const dealProducts = useMemo(() => {
    return (products
      .filter((p) => p.priceAfterDiscount)
      .map((p) => ({
        ...p,
        discountPercentage: Math.round(
          ((p.price - (p.priceAfterDiscount || 0)) / p.price) * 100
        ),
      })) as ProductWithDiscount[]
    ).sort((a, b) => b.discountPercentage - a.discountPercentage);
  }, [products]);

  if (loading) return <DealsSkeleton />;
  if (dealProducts.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Deals of the Day</h2>
          <p className="text-xs text-gray-500">
            Offers end in: <span className="font-mono text-red-600 font-semibold">23:12:15</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button className="deals-prev w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors" aria-label="Previous">
              <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
            </button>
            <button className="deals-next w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors" aria-label="Next">
              <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
            </button>
          </div>
          <Link href="/deals" className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold transition-colors group text-sm">
            <span>View All</span>
            <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      <div className="[&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:!bg-green-600 [&_.swiper-pagination-bullet-active]:!w-5 [&_.swiper-pagination-bullet-active]:rounded-full">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{ nextEl: ".deals-next", prevEl: ".deals-prev" }}
          speed={400}
          spaceBetween={16}
          slidesPerView={2}
          slidesPerGroup={2}
          breakpoints={{ 640: { slidesPerView: 3, slidesPerGroup: 3 }, 1024: { slidesPerView: 6, slidesPerGroup: 6 } }}
          className="pb-10"
        >
          {dealProducts.map((product, i) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} priority={i < 6} showDealBadge />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}