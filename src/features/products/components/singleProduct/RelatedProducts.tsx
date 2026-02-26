'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../ProductCard";
import { useRelatedProducts } from "../../hooks/useRelatedProducts";

import "swiper/css";
import "swiper/css/navigation";

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const { relatedProducts, loading } = useRelatedProducts({ categoryId, currentProductId });

  if (loading) {
    return (
      <div className="py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="aspect-square bg-gray-200 animate-pulse"></div>
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
        <div className="flex gap-2">
          <button
            className="swiper-button-prev-related w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous products"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
          </button>
          <button
            className="swiper-button-next-related w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next products"
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        navigation={{
          prevEl: '.swiper-button-prev-related',
          nextEl: '.swiper-button-next-related',
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        className="related-products-swiper"
      >
        {relatedProducts.map((product, index) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} priority={index < 5} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
