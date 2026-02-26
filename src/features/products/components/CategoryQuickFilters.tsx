"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { ApiCategoryItem } from "@/src/features/categories/types/category.type";

interface CategoryQuickFiltersProps {
  categories: ApiCategoryItem[];
  loading: boolean;
  activeId: string;
  onSelect: (id: string) => void;
}

export default function CategoryQuickFilters({
  categories,
  loading,
  activeId,
  onSelect,
}: CategoryQuickFiltersProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-8 w-20 rounded-full bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 mb-6 bg-white rounded-xl border border-gray-200 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <FontAwesomeIcon icon={faTag} className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-sm font-semibold text-gray-700">No Categories Found</p>
        <p className="text-xs text-gray-400 mt-1">No categories are available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-6 hide-scrollbar">
      {/* "All" pill */}
      <button
        onClick={() => onSelect("all")}
        className={`px-4 py-1.5 rounded-full border text-sm font-medium shrink-0 transition-colors ${
          activeId === "all"
            ? "bg-green-600 border-green-600 text-white"
            : "border-gray-300 text-gray-600 hover:border-green-600 hover:text-green-600"
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat._id)}
          className={`px-4 py-1.5 rounded-full border text-sm font-medium shrink-0 transition-colors ${
            activeId === cat._id
              ? "bg-green-600 border-green-600 text-white"
              : "border-gray-300 text-gray-600 hover:border-green-600 hover:text-green-600"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
