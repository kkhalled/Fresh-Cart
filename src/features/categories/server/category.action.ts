"use server";

import axios, { AxiosRequestConfig } from "axios";
import { CATEGORY_ENDPOINTS } from "@/src/config/api";
import type {
  CategoriesResponse,
  CategoryDetailResponse,
  SubcategoriesResponse,
} from "../types/category.type";

/* ═══════════════════════════════════════════════════════════════════════════
   category.action.ts
   Server-side category actions. All Axios calls live here.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Fetch all categories.
 */
export default async function getAllCategories(): Promise<CategoriesResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: CATEGORY_ENDPOINTS.allCategories,
    };

    const { data } = await axios.request<CategoriesResponse>(options);
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch a single category by ID.
 */
export async function getCategoryById(
  id: string,
): Promise<CategoryDetailResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: CATEGORY_ENDPOINTS.categoryById(id),
    };

    const { data } = await axios.request<CategoryDetailResponse>(options);
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch all subcategories for a specific category.
 */
export async function getSubcategoriesByCategory(
  categoryId: string,
): Promise<SubcategoriesResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: CATEGORY_ENDPOINTS.subcategoriesByCategory(categoryId),
    };

    const { data } = await axios.request<SubcategoriesResponse>(options);
    return data;
  } catch (error) {
    throw error;
  }
}

