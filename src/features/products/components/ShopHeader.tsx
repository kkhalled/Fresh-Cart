type SortOption = "popular" | "price-asc" | "price-desc" | "newest";

interface ShopHeaderProps {
  total: number;
  sortValue: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function ShopHeader({ total, sortValue, onSortChange }: ShopHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Shop</h1>
        <p className="text-sm text-gray-500 mt-0.5">Showing {total} products</p>
      </div>

      <select
        value={sortValue}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="border border-gray-300 rounded-md text-sm text-gray-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white w-full sm:w-auto"
      >
        <option value="popular">Most Popular</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}
