"use client";

import useCategory from "../hooks/useCategory";
import SubcategoryCard from "../components/SubcategoryCard";
import EmptySubcategories from "../components/EmptySubcategories";
import CategorySkeleton from "../components/CategorySkeleton";

/* ═══════════════════════════════════════════════════════════════════════════
   CategoryDetailScreen
   Main page-level component for /categories/:id route.
   Shows hero banner with category image + name, then subcategories grid.
   ═══════════════════════════════════════════════════════════════════════════ */

interface CategoryDetailScreenProps {
  categoryId: string;
}

export default function CategoryDetailScreen({ categoryId }: CategoryDetailScreenProps) {
  const { category, subcategories, loading, error } = useCategory(categoryId);

  // Loading state
  if (loading) {
    return <CategorySkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md">
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  // No category found
  if (!category) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      
      <div
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${category.image})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {category.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Subcategories heading */}
        {subcategories.length > 0 && (
          <h2 className="text-lg font-semibold text-neutral-900 mb-6">
            Explore Subcategories
          </h2>
        )}

        {/* Subcategories grid */}
        {subcategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {subcategories.map((subcategory) => (
              <SubcategoryCard key={subcategory._id} subcategory={subcategory} />
            ))}
          </div>
        ) : (
          <EmptySubcategories categoryName={category.name} />
        )}
      </div>
    </div>
  );
}
