"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFolder } from "@fortawesome/free-solid-svg-icons";
import { ApiCategoryItem } from "@/src/features/categories/types/category.type";

export interface FiltersState {
  categories: string[];
  minPrice: string;
  maxPrice: string;
  minRating: number | null;
  inStockOnly: boolean;
}

interface FilterSidebarProps {
  categories: ApiCategoryItem[];
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
}

const ratings = [5, 4, 3, 2, 1];

export default function FilterSidebar({ categories, filters, onChange }: FilterSidebarProps) {
  const toggleCategory = (id: string) => {
    const updated = filters.categories.includes(id)
      ? filters.categories.filter((c) => c !== id)
      : [...filters.categories, id];
    onChange({ ...filters, categories: updated });
  };

  const setRating = (rating: number) => {
    onChange({ ...filters, minRating: filters.minRating === rating ? null : rating });
  };

  const clearAll = () => {
    onChange({ categories: [], minPrice: "", maxPrice: "", minRating: null, inStockOnly: false });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.minRating !== null ||
    filters.inStockOnly;

  return (
    <aside className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 shadow-sm h-fit">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Categories
        </h3>

        {categories.length === 0 ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <FontAwesomeIcon icon={faFolder} className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-700">No Categories Found</p>
            <p className="text-xs text-gray-400 mt-1">No categories are available yet.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat._id}>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat._id)}
                    onChange={() => toggleCategory(cat._id)}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {cat.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-gray-100" />

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            min={0}
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
          <span className="text-gray-400 text-sm shrink-0">–</span>
          <input
            type="number"
            placeholder="Max"
            min={0}
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Rating */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Rating
        </h3>
        <ul className="space-y-2">
          {ratings.map((rating) => (
            <li key={rating}>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => setRating(rating)}
                  className="w-4 h-4 border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                />
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`w-3 h-3 ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">& up</span>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-100" />

      {/* Availability */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Availability
        </h3>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
          />
          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
            In Stock Only
          </span>
        </label>
      </div>

      {/* Clear Button */}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="w-full py-2 border border-red-300 rounded-md text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </aside>
  );
}
