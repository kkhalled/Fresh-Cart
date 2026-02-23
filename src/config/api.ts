// API configuration for ecommerce platform
export const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1/";

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  signup: API_BASE_URL + "auth/signup",
  signin: API_BASE_URL + "auth/signin",
  forgotPassword: API_BASE_URL + "auth/forgotPasswords",
  verifyResetCode: API_BASE_URL + "auth/verifyResetCode",
  resetPassword: API_BASE_URL + "auth/resetPassword",
};
