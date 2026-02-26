"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBoxOpen, faStar, faDollarSign, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getBrandById } from "../server/brand.action";
import { getProducts } from "../../products/server/products.action";
import { Brand } from "../types/brand.type";
import { Product } from "../../products/types/products.types";
import ProductCard from "../../products/components/ProductCard";
import StatsCard from "../components/StatsCard";

interface BrandDetailsScreenProps {
  brandId: string;
}

export default function BrandDetailsScreen({ brandId }: BrandDetailsScreenProps) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrandAndProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch brand details and all products in parallel
        const [brandResponse, productsResponse] = await Promise.all([
          getBrandById(brandId),
          getProducts(),
        ]);

        setBrand(brandResponse.data);

        // Filter products by brand ID
        const brandProducts = productsResponse.data.filter(
          (product) => product.brand._id === brandId
        );
        setProducts(brandProducts);
      } catch (err) {
        console.error("Failed to fetch brand details:", err);
        setError("Failed to load brand details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBrandAndProducts();
  }, [brandId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand Header Skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-48 h-48 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto md:mx-0"></div>
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mx-auto md:mx-0"></div>
            </div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100">
              <div className="aspect-square bg-gray-200 animate-pulse"></div>
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">{error || "Brand not found"}</p>
          <Link
            href="/brands"
            className="inline-block mt-4 text-green-600 hover:text-green-700 font-medium"
          >
            Back to Brands
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        href="/brands"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6 transition-colors"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
        <span className="font-medium">Back to Brands</span>
      </Link>

      {/* Brand Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
          {/* Brand Logo */}
          <div className="relative w-32 h-32 sm:w-48 sm:h-48 bg-gray-50 rounded-lg border border-gray-200 p-4 shrink-0">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-contain p-2"
              sizes="(max-width: 640px) 128px, 192px"
            />
          </div>

          {/* Brand Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {brand.name}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {products.length} {products.length === 1 ? 'product' : 'products'} available
            </p>

            {/* Stats Grid */}
            {products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <StatsCard
                  icon={faShoppingBag}
                  label="Total Products"
                  value={products.length}
                  color="green"
                />
                <StatsCard
                  icon={faStar}
                  label="Avg Rating"
                  value={(
                    products.reduce((sum, p) => sum + p.ratingsAverage, 0) / products.length
                  ).toFixed(1)}
                  color="orange"
                />
                <StatsCard
                  icon={faDollarSign}
                  label="Starting From"
                  value={`$${Math.min(...products.map(p => p.priceAfterDiscount || p.price))}`}
                  color="blue"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Products from {brand.name}
        </h2>
        <div className="h-1 w-20 bg-green-600 rounded"></div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-12 text-center">
          <FontAwesomeIcon
            icon={faBoxOpen}
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Products Available
          </h3>
          <p className="text-gray-600">
            There are currently no products from {brand.name}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} priority={index < 5} />
          ))}
        </div>
      )}
    </section>
  );
}
