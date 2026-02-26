// API configuration for ecommerce platform
export const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1/";

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  signup: API_BASE_URL + "auth/signup",
  signin: API_BASE_URL + "auth/signin",
  forgotPassword: API_BASE_URL + "auth/forgotPasswords",
  verifyResetCode: API_BASE_URL + "auth/verifyResetCode",
  resetPassword: API_BASE_URL + "auth/resetPassword",
  verifyToken: API_BASE_URL + "auth/verifyToken",
};

export const CATEGORY_ENDPOINTS = {
  allCategories: API_BASE_URL + "categories",
  categoryById: (id: string) => `${API_BASE_URL}categories/${id}`,
};

export const BRAND_ENDPOINTS = {
  allBrands: API_BASE_URL + "brands",
  brandById: API_BASE_URL + "brands",
};

export const PRODUCTS_ENDPOINTS = {
  allProducts: API_BASE_URL + "products",
  productById: API_BASE_URL + "products" ,
};