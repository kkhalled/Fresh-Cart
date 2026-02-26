"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAllBrands } from "../hooks/useAllBrands";
import BrandCard from "../components/BrandCard";
import BrandsSkeleton from "../components/BrandsSkeleton";

export default function AllBrandsScreen() {
  const { brands: filteredBrands, totalBrands, loading, error, searchQuery, setSearchQuery } = useAllBrands();

  if (loading) {
    return <BrandsSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop by Brand</h1>
        <p className="text-gray-600">
          Discover products from your favorite brands
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {filteredBrands.length} of {totalBrands} brands
        </p>
      </div>

      {/* Brands Grid */}
      {filteredBrands.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No brands found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredBrands.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      )}
    </section>
  );
}
