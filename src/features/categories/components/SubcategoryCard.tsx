"use client";

import Link from "next/link";
import type { ApiSubcategoryItem } from "../types/category.type";

/* ═══════════════════════════════════════════════════════════════════════════
   SubcategoryCard
   Clean, clickable card for a subcategory. Navigates to products filtered
   by the subcategory slug.
   ═══════════════════════════════════════════════════════════════════════════ */

interface SubcategoryCardProps {
  subcategory: ApiSubcategoryItem;
}

export default function SubcategoryCard({ subcategory }: SubcategoryCardProps) {
  return (
    <Link
      href={`/products?subcategory=${subcategory.slug}`}
      className="
        group block bg-white rounded-xl border border-neutral-200 p-6 
        hover:border-emerald-400 hover:shadow-lg transition-all duration-300
        hover:scale-105
      "
    >
      <div className="flex items-center justify-center mb-3">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
          <span className="text-2xl font-bold text-emerald-600">
            {subcategory.name.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>

      <h3 className="text-center text-sm font-semibold text-neutral-900 group-hover:text-emerald-600 transition-colors">
        {subcategory.name}
      </h3>
    </Link>
  );
}
