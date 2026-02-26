import { CATEGORY_ENDPOINTS } from "@/src/config/api";
import axios, { AxiosRequestConfig } from "axios";
import { CategoriesResponse } from "../types";

export default async function getAllCategories(): Promise<CategoriesResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: CATEGORY_ENDPOINTS.allCategories,
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCategoryById(id: string) {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: CATEGORY_ENDPOINTS.categoryById + `/${id}`,
    };
  } catch (error) {
    throw error;
  }
}
