"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { fetchCategoryWithSubcategoriesThunk } from "../store/categories.thunks";
import { clearCategoryData } from "../store/categories.slice";

/* ═══════════════════════════════════════════════════════════════════════════
   useCategory
   Fetches category details + subcategories for a given category ID.
   Cleans up state on unmount.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function useCategory(categoryId: string | null) {
  const dispatch = useAppDispatch();

  const selectedCategory = useAppSelector((s) => s.categories.selectedCategory);
  const subcategories = useAppSelector((s) => s.categories.subcategories);
  const loading = useAppSelector((s) => s.categories.loading);
  const error = useAppSelector((s) => s.categories.error);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryWithSubcategoriesThunk(categoryId));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearCategoryData());
    };
  }, [categoryId, dispatch]);

  return {
    category: selectedCategory,
    subcategories,
    loading,
    error,
  };
}
