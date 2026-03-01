"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
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

interface ProductWithDiscount extends Product { discountPercentage: number; }

interface DealsSectionProps {
  products: Product[];
}

/** Returns ms until midnight in the user's local timezone. */
function getMsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

function formatTime(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const s = String(totalSec % 60).padStart(2, "0");
  return { h, m, s };
}

function useCountdown() {
  const [remaining, setRemaining] = useState(getMsUntilMidnight);

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(getMsUntilMidnight());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return formatTime(remaining);
}

function TimerBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-gray-900 text-white text-xs sm:text-sm font-bold font-mono rounded-md px-1.5 py-0.5 min-w-7 text-center leading-snug">
        {value}
      </span>
      <span className="text-[9px] text-gray-400 mt-0.5">{label}</span>
    </div>
  );
}

export default function DealsSection({ products }: DealsSectionProps) {
  const { h, m, s } = useCountdown();

  const dealProducts = useMemo(() => {
    return (products
      .filter((p) => p.priceAfterDiscount)
      .map((p) => ({
        ...p,
        discountPercentage: Math.round(
          ((p.price - (p.priceAfterDiscount || 0)) / p.price) * 100
        ),
      })) as ProductWithDiscount[]
    ).sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 10);
  }, [products]);

  if (dealProducts.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Deals of the Day</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-500">Ends in:</span>
            <div className="flex items-center gap-1">
              <TimerBadge value={h} label="hrs" />
              <span className="text-gray-400 font-bold text-xs leading-none mb-3">:</span>
              <TimerBadge value={m} label="min" />
              <span className="text-gray-400 font-bold text-xs leading-none mb-3">:</span>
              <TimerBadge value={s} label="sec" />
            </div>
          </div>
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