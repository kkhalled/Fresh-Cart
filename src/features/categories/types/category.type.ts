import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";

// API Response Types
export interface ApiCategoryItem {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export  interface CategoryProps {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ApiCategoriesMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface CategoriesResponse {
  results: number;
  metadata: ApiCategoriesMetadata;
  data: ApiCategoryItem[];
}

// Type for the categories array (data.data)
export type CategoriesArray = ApiCategoryItem[];

// Frontend Component Types




// Utility Types
