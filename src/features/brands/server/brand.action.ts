"use server";
import { BRAND_ENDPOINTS } from "@/src/config/api";
import axios, { AxiosRequestConfig } from "axios";
import { BrandsResponse, BrandDetailsResponse } from "../types/brand.type";

export async function getAllBrands(): Promise<BrandsResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: BRAND_ENDPOINTS.allBrands,
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBrandById(id: string): Promise<BrandDetailsResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `${BRAND_ENDPOINTS.brandById}/${id}`,
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
