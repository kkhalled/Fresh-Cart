'use client';

import { faChevronDown, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
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
];

interface NavigationBarProps {
  initialCategories?: ApiCategoryItem[];
}

export default function NavigationBar({ initialCategories = [] }: NavigationBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const categories: Category[] = initialCategories;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when screen size increases
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };
  return (
    <>
      {/* Navigation Menu */}
      <div className="bg-gray-50 border-[.10px] border-gray-50">
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
                <div className="absolute top-full left-0  w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-100">
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
                        href={`/categories/${category.slug}`}
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

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center justify-between w-full">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors duration-200"
                aria-label="Toggle navigation menu"
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-lg" />
                <span className="font-medium text-sm">Menu</span>
              </button>
              
              {/* Mobile Categories Button */}
              <Link
                href="/categories"
                className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200"
              >
                Categories
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 animate-fade-in">
              <nav className="space-y-1">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActiveLink(link.href)
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              
              {/* Mobile Categories */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">
                  Shop by Category
                </h3>
                <div className="space-y-1">
                  <Link
                    href="/categories"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3.5 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                  >
                    <span className="text-sm font-medium">All Categories</span>
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/categories/${category._id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3.5 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    >
                      <span className="text-sm font-medium">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
