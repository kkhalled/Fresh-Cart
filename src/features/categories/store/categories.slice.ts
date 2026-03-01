import { createSlice } from "@reduxjs/toolkit";
import type { CategoryState } from "../types/category.type";
import { fetchCategoryWithSubcategoriesThunk } from "./categories.thunks";

/* ═══════════════════════════════════════════════════════════════════════════
   categories.slice.ts
   Pure Redux logic — no Axios, no side-effects.
   ═══════════════════════════════════════════════════════════════════════════ */

const initialState: CategoryState = {
  selectedCategory: null,
  subcategories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoryData(state) {
      state.selectedCategory = null;
      state.subcategories = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryWithSubcategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategoryWithSubcategoriesThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.selectedCategory = action.payload.category;
          state.subcategories = action.payload.subcategories;
        },
      )
      .addCase(
        fetchCategoryWithSubcategoriesThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload ?? "Unknown error";
        },
      );
  },
});

export const { clearCategoryData } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
