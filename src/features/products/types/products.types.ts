export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  _id: string;
  id: string;
  sold: number | null;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  previousPage?: number;
}

export interface ProductsResponse {
  results: number;
  metadata: ProductsMetadata;
  data: Product[];
}

export interface ProductDetailsResponse {
  data: Product;
}