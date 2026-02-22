import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function NavigationBar() {
  return <>
      {/* Navigation Menu */}
      <div className="bg-gray-100 border border-gray-50 shadow-2xl  py-1.5  ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-8">
            {/* All Categories Dropdown */}
            <div className=" group  ">
              <button className="bg-green-600  text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-green-700">
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
                <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
              </button>

                {/* Dropdown Menu */}
                <div className="absolute  min-w-43 px-1 bg-white border border-gray-200 rounded  shadow-lg hidden group-hover:block invisible group-hover:visible transition-opacity duration-300 z-10">
                  <ul className="py-2">
                    <li className="border-b border-gray-200">
                        <Link href="/categories/vegetables">Vegetables</Link>
                    </li >
                    <li>
                        <Link href="/categories/fruits">Fruits</Link>
                    </li>
                    <li>
                        <Link href="/categories/dairy">Dairy</Link>
                    </li>
                  </ul>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-6 *:text-gray-500 text-sm py-3">
              <Link
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Shop
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Deals
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                New Arrivals
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Brands
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Recipes
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
 
}
