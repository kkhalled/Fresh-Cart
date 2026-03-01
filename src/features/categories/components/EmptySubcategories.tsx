import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

/* ═══════════════════════════════════════════════════════════════════════════
   EmptySubcategories
   Shown when a category has no subcategories.
   ═══════════════════════════════════════════════════════════════════════════ */

interface EmptySubcategoriesProps {
  categoryName?: string;
}

export default function EmptySubcategories({ categoryName }: EmptySubcategoriesProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
      <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
        <FontAwesomeIcon
          icon={faBoxOpen}
          className="w-11 h-11 text-neutral-400"
        />
      </div>
      
      <h2 className="text-xl font-semibold text-neutral-900 mb-2">
        No subcategories available
      </h2>
      
      <p className="text-sm text-neutral-500 mb-6">
        {categoryName 
          ? `The "${categoryName}" category doesn't have subcategories yet. Explore our full product catalog instead.`
          : "This category doesn't have subcategories yet. Browse all products to discover what we offer."}
      </p>
      
      <Link
        href="/products"
        className="
          inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg
          bg-emerald-600 text-white hover:bg-emerald-700 transition-colors
          focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2
        "
      >
        Browse All Products
      </Link>
    </div>
  );
}
