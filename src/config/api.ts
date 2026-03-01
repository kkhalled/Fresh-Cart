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
  subcategoriesByCategory: (categoryId: string) => `${API_BASE_URL}categories/${categoryId}/subcategories`,
};

export const BRAND_ENDPOINTS = {
  allBrands: API_BASE_URL + "brands",
  brandById: API_BASE_URL + "brands",
};

export const PRODUCTS_ENDPOINTS = {
  allProducts: API_BASE_URL + "products",
  productById: API_BASE_URL + "products" ,
};

export const CART_ENDPOINTS = {
  cart: API_BASE_URL + "cart",
  cartItem: (productId: string) => `${API_BASE_URL}cart/${productId}`,
};

export const WISHLIST_ENDPOINTS = {
  wishlist: API_BASE_URL + "wishlist",
  wishlistItem: (productId: string) => `${API_BASE_URL}wishlist/${productId}`,
};

export const USER_ENDPOINTS = {
  updateMe: API_BASE_URL + "users/updateMe/",
  changeMyPassword: API_BASE_URL + "users/changeMyPassword",
};

export const ADDRESS_ENDPOINTS = {
  addresses: API_BASE_URL + "addresses",
  addressById: (addressId: string) => `${API_BASE_URL}addresses/${addressId}`,
};

export const CHECKOUT_ENDPOINTS = {
  cashOrder: (cartId: string) => `${API_BASE_URL}orders/${cartId}`,
  onlineSession: (cartId: string, originUrl: string) =>
    `${API_BASE_URL}orders/checkout-session/${cartId}?url=${originUrl}`,
};

export const ORDER_ENDPOINTS = {
  userOrders: (userId: string) => `${API_BASE_URL}orders/user/${userId}`,
};

