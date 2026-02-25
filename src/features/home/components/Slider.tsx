'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image, { type StaticImageData } from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import sliderImage1 from '../../../assets/home-slider-1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface SlideData {
  id: number;
  image: StaticImageData;
  subtitle: string;
  heading: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: sliderImage1,
    subtitle: 'Fresh Deals Every Day',
    heading: 'Shop the Freshest Groceries Online',
    description:
      'Discover thousands of products delivered straight to your door. Quality and freshness guaranteed.',
    primaryCta: 'Shop Now',
    secondaryCta: 'Learn More',
  },
  {
    id: 2,
    image: sliderImage1,
    subtitle: 'Exclusive Offers',
    heading: 'Up to 50% Off on Selected Items',
    description:
      "Limited-time deals on your favourite brands. Don't miss out on amazing savings.",
    primaryCta: 'View Deals',
    secondaryCta: 'Browse All',
  },
  {
    id: 3,
    image: sliderImage1,
    subtitle: 'New Arrivals',
    heading: 'Discover Our Latest Products',
    description:
      'Explore a wide range of new items handpicked for quality, freshness, and great value.',
    primaryCta: 'Explore Now',
    secondaryCta: 'See More',
  },
];

export default function Slider() {
  return (
    <section className="w-full">
      {/* Wrapper: positions custom nav arrows + scopes Swiper bullet overrides */}
      <div
        className="
          relative w-full
          [&_.swiper-pagination]:bottom-4!
          [&_.swiper-pagination-bullet]:w-2.5
          [&_.swiper-pagination-bullet]:h-2.5
          [&_.swiper-pagination-bullet]:bg-white/50
          [&_.swiper-pagination-bullet]:opacity-100
          [&_.swiper-pagination-bullet]:transition-all
          [&_.swiper-pagination-bullet]:duration-300
          [&_.swiper-pagination-bullet]:rounded-full
          [&_.swiper-pagination-bullet-active]:bg-white!
          [&_.swiper-pagination-bullet-active]:w-6!
          [&_.swiper-pagination-bullet-active]:rounded-full!
        "
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          speed={450}
          navigation={{
            nextEl: '.hero-slider-next',
            prevEl: '.hero-slider-prev',
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="w-full h-62.5 md:h-80 lg:h-105"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id} className="relative w-full h-full">
              {/* Background image */}
              <Image
                src={slide.image}
                alt={slide.heading}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
              />

              {/* Green tint overlay */}
              <div className="absolute inset-0 bg-green-500/50" />

              {/* Slide content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                  <div className="max-w-xl">
                    <p className="text-green-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-2 md:mb-3">
                      {slide.subtitle}
                    </p>

                    <h2 className="text-white text-xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 md:mb-4">
                      {slide.heading}
                    </h2>

                    <p className="text-gray-200 text-xs md:text-sm lg:text-base leading-relaxed mb-4 md:mb-6">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold text-xs md:text-sm px-5 md:px-6 py-2 md:py-2.5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
                        {slide.primaryCta}
                      </button>

                      <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold text-xs md:text-sm px-5 md:px-6 py-2 md:py-2.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                        {slide.secondaryCta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom previous arrow */}
        <button
          aria-label="Previous slide"
          className="hero-slider-prev absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/20 hover:bg-white/40 text-white border border-white/30 backdrop-blur-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Custom next arrow */}
        <button
          aria-label="Next slide"
          className="hero-slider-next absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/20 hover:bg-white/40 text-white border border-white/30 backdrop-blur-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 md:w-5 md:h-5" />
          
        </button>
      </div>
    </section>
  );
}
