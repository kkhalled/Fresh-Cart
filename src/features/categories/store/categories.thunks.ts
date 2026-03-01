import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategoryById,
  getSubcategoriesByCategory,
} from "../server/category.action";
import type {
  ApiCategoryItem,
  ApiSubcategoryItem,
} from "../types/category.type";

/* ═══════════════════════════════════════════════════════════════════════════
   categories.thunks.ts
   Async thunks that bridge server actions → Redux state.
   No direct Axios calls — every network operation delegates to the server layer.
   ═══════════════════════════════════════════════════════════════════════════ */

interface CategoryPayload {
  category: ApiCategoryItem;
  subcategories: ApiSubcategoryItem[];
}

/**
 * Fetch category details + its subcategories in parallel.
 * Returns both as a single payload for efficient state update.
 */
export const fetchCategoryWithSubcategoriesThunk = createAsyncThunk<
  CategoryPayload,
  string, // categoryId
  { rejectValue: string }
>(
  "categories/fetchCategoryWithSubcategories",
  async (categoryId, { rejectWithValue }) => {
    try {
      // Fetch category and subcategories in parallel
      const [categoryResponse, subcategoriesResponse] = await Promise.all([
        getCategoryById(categoryId),
        getSubcategoriesByCategory(categoryId),
      ]);

      return {
        category: categoryResponse.data,
        subcategories: subcategoriesResponse.data,
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load category data";
      return rejectWithValue(message);
    }
  },
);
