"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CategoriesArray } from "../../categories/types";
import getAllCategories from "../../categories/server/category.action";

export default function CategorySection() {
  const [categories, setCategories] = useState<CategoriesArray>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response?.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="w-full py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Shop by <span className="text-green-600">Category</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Discover a world of fresh products organized just for you
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 group"
          >
            View All Categories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 lg:gap-8">
          {isLoading
            ? // Enhanced Loading skeleton
              Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center animate-pulse"
                >
                  <div className="relative">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-linear-to-br from-gray-200 to-gray-300 mb-4 shadow-sm"></div>
                    <div className="absolute inset-0 rounded-full bg-white/20"></div>
                  </div>
                  <div className="h-4 w-20 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 w-16 bg-gray-150 rounded"></div>
                </div>
              ))
            : // Enhanced category cards
              categories.slice(0, 10).map((category) => (
                <Link
                  key={category._id}
                  href={`/categories/${category._id}`}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Enhanced image container */}
                  <div className="relative mb-4">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-full bg-white shadow-md group-hover:shadow-xl transition-all duration-500 ring-4 ring-transparent group-hover:ring-green-100 group-hover:ring-offset-2">
                      <div className="absolute inset-0 bg-linear-to-br from-green-50 to-gray-50 opacity-20"></div>
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 96px, 112px"
                        className="object-cover group-hover:scale-110 transition-transform duration-500 relative z-10"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    </div>
                    {/* Floating badge effect */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-linear-to-br from-green-400 to-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 shadow-lg flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  {/* Enhanced text */}
                  <div className="text-center">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300 mb-1 leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500 group-hover:text-green-500 transition-colors duration-300">
                      Explore now
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
