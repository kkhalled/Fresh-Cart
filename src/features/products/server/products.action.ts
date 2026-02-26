"use server";
import { PRODUCTS_ENDPOINTS } from "@/src/config/api";
import axios, { AxiosRequestConfig } from "axios";
import { Product, ProductDetailsResponse, ProductsResponse } from "../types/products.types";

export async function getProducts(): Promise<ProductsResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: PRODUCTS_ENDPOINTS.allProducts,
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getProductsDetails(id: string): Promise<ProductDetailsResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: PRODUCTS_ENDPOINTS.productById+`/${id}`,
    };
    console.log(options);
    
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
