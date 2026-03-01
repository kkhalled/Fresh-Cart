'use client';

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ApiCategoryItem } from "@/src/features/categories/types/category.type";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/products' },
  { name: 'Deals', href: '/deals' },
  { name: 'Brands', href: '/brands' },
  { name: 'Orders', href: '/orders' },
];

interface NavigationBarProps {
  initialCategories?: ApiCategoryItem[];
}

export default function NavigationBar({ initialCategories = [] }: NavigationBarProps) {
  const categories: Category[] = initialCategories;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const atTop = window.scrollY < 10;
        setIsAtTop(atTop);
        if (!atTop) setIsDropdownOpen(false);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafId); };
  }, []);

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };
  return (
    <>
      {/* Navigation Menu */}
      <div className={`bg-gray-50 border-[.10px] border-gray-50 transition-all duration-300 ease-in-out ${isDropdownOpen ? "" : "overflow-hidden"} ${isAtTop ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 w-full">
            {/* All Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="bg-green-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors duration-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span className="font-medium text-sm">All Categories</span>
                <FontAwesomeIcon 
                  icon={faChevronDown} 
                  className={`text-xs transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                  <div className="py-2">
                    <Link
                      href="/categories"
                      className="block px-5 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
                    >
                      <span className="text-sm font-medium">All Categories</span>
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/categories/${category._id}`}
                        className="block px-5 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
                      >
                        <span className="text-sm font-medium">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 py-2 ${
                    isActiveLink(link.href)
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            </div>

            {/* Mobile Navigation — horizontal scrollable strip */}
            <div className="md:hidden flex items-center w-full overflow-x-auto scrollbar-hide gap-2 py-0.5 -mx-1 px-1">
              <Link
                href="/categories"
                className="shrink-0 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center gap-1.5"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Categories
              </Link>
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                    isActiveLink(link.href)
                      ? 'bg-green-50 text-green-600 ring-1 ring-green-200'
                      : 'text-gray-600 bg-gray-100 hover:bg-green-50 hover:text-green-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
