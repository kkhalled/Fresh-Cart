import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";

/* ═══════════════════════════════════════════════════════════════════════════
   category.type.ts
   TypeScript interfaces for Categories & Subcategories feature.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Category Types ────────────────────────────────────────────────────── */

export interface ApiCategoryItem {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryProps {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ApiCategoriesMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface CategoriesResponse {
  results: number;
  metadata: ApiCategoriesMetadata;
  data: ApiCategoryItem[];
}

export interface CategoryDetailResponse {
  data: ApiCategoryItem;
}

/* ─── Subcategory Types ─────────────────────────────────────────────────── */

export interface ApiSubcategoryItem {
  _id: string;
  name: string;
  slug: string;
  category: string; // parent category ID
  createdAt?: string;
  updatedAt?: string;
}

export interface SubcategoriesResponse {
  results: number;
  data: ApiSubcategoryItem[];
}

/* ─── Redux State Shape ─────────────────────────────────────────────────── */

export interface CategoryState {
  selectedCategory: ApiCategoryItem | null;
  subcategories: ApiSubcategoryItem[];
  loading: boolean;
  error: string | null;
}

/* ─── Utility Types ─────────────────────────────────────────────────────── */

export type CategoriesArray = ApiCategoryItem[];
export type SubcategoriesArray = ApiSubcategoryItem[];

