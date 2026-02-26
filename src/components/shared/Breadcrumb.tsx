"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useEffect, useState } from "react";
import getAllCategories from "@/src/features/categories/server/category.action";
import { ApiCategoryItem } from "@/src/features/categories/types/category.type";
import { getProductsDetails } from "@/src/features/products/server/products.action";
import { Product, ProductDetailsResponse } from "@/src/features/products/types/products.types";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<ApiCategoryItem[]>([]);
  const [product, setProduct] = useState<ProductDetailsResponse | null>(null);

  // Fetch categories for dynamic breadcrumb labels
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch product details if on a product page
  useEffect(() => {
    const fetchProduct = async () => {
      // Check if we're on a product details page (pattern: /products/{id})
      const productMatch = pathname.match(/^\/products\/([^\/]+)$/);
      if (productMatch) {
        const productId = productMatch[1];
        try {
          const productData = await getProductsDetails(productId);
          setProduct(productData);
        } catch (error) {
          console.error("Failed to fetch product details:", error);
          setProduct(null);
        }
      } else {
        setProduct(null);
      }
    };
    fetchProduct();
  }, [pathname]);

  const breadcrumbs = useMemo(() => {
    // Don't show breadcrumb on home page
    if (pathname === "/") return null;

    const segments = pathname.split("/").filter((segment) => segment !== "");
    const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    // Build breadcrumb items from URL segments
    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format the label (convert kebab-case to Title Case)
      let label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Handle specific routes
      const routeLabels: Record<string, string> = {
        "/products": "Shop",
        "/cart": "Shopping Cart",
        "/wishlist": "Wishlist",
        "/checkout": "Checkout",
        "/orders": "My Orders",
        "/account": "My Account",
        "/brands": "Brands",
        "/categories": "Categories",
        "/deals": "Deals",
        "/search": "Search Results",
        "/products/": "Product Details",
      };

      if (routeLabels[currentPath]) {
        label = routeLabels[currentPath];
      }

      // Handle category ID - find category name
      if (segments[index - 1] === "categories" && categories.length > 0) {
        const category = categories.find((cat) => cat._id === segment);
        if (category) {
          label = category.name;
        }
      }

      // Handle product ID - find product name
      if (segments[index - 1] === "products" && product) {
        label = product.data.category.name; // Use category name as breadcrumb label for product details
      }

      items.push({
        label,
        href: currentPath,
      });
    });

    return items;
  }, [pathname, categories, product]);

  // Don't render if no breadcrumbs
  if (!breadcrumbs) return null;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center py-2" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              
              return (
                <li key={item.href} className="flex items-center gap-2">
                  {index > 0 && (
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="w-3 h-3 text-gray-400"
                    />
                  )}
                  {isLast ? (
                    <span className="text-green-600 font-medium">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
