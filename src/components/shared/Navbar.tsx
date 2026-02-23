"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faSearch,
  faArrowsRotate,
  faCartShopping,
  faChevronDown,
  faSignOutAlt,
  faUserPlus,
  
} from "@fortawesome/free-solid-svg-icons";

import { faAddressCard, faHeart, faUser } from "@fortawesome/free-regular-svg-icons";

import logo from "../../assets/freshcart-logo.svg";
import NavigationBar from "./NavigationBar";
import Link from "next/link";

export default function Navbar() {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-xs">
          <div className="flex items-center gap-6">
            <a
              href="tel:+18001234567"
              className="flex items-center gap-2 text-gray-600 hover:text-green-600"
            >
              <FontAwesomeIcon icon={faPhone} className="text-xs" />
              <span>+1 (800) 123-4567</span>
            </a>
            <a
              href="mailto:support@freshcart.com"
              className="flex items-center gap-2 text-gray-600 hover:text-green-600"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
              <span>support@freshcart.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-green-600">
              Track Order
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600">
              Contact
            </a>
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="appearance-none bg-transparent text-gray-600 hover:text-green-600 pr-6 cursor-pointer focus:outline-none"
              >
                <option>USD</option>
                <option>EGP</option>
                <option>EUR</option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-gray-600 pointer-events-none"
              />
            </div>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none bg-transparent text-gray-600 hover:text-green-600 pr-6 cursor-pointer focus:outline-none"
              >
                <option>English</option>
                <option>Arabic</option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-gray-600 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white  ">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              <Image src={logo} alt="FreshCart Logo" width={150} height={50} />
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-1 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-6 text-[10px]">
            <Link
              href="/whishlist"
              className="flex flex-col items-center text-gray-600 hover:text-green-600"
            >
              <FontAwesomeIcon icon={faHeart} className="text-lg mb-1 " />
              <span className="text-[10px]">Wishlist</span>
            </Link>
  
            <Link
              href="#"
              className="flex flex-col items-center text-gray-600 hover:text-green-600 relative"
            >
              <div className="relative">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-lg mb-1"
                />
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <span className="text-[10px]">Cart</span>
            </Link>
            <Link
              href="/cart"
              className="flex flex-col items-center text-gray-600 hover:text-green-600"
            >
              <FontAwesomeIcon icon={faUser} className="text-lg mb-1" />
              <span className="text-[10px]">Account</span>
            </Link>
            <Link
              href="/cart"
              className="flex flex-col items-center text-gray-600 hover:text-green-600"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="text-lg mb-1" />
              <span className="text-[10px]">Log Out</span>
            </Link>
            <Link
              href="/cart"
              className="flex flex-col items-center text-gray-600 hover:text-green-600"
            >
              <FontAwesomeIcon icon={faUserPlus}  className="text-lg mb-1" />
              <span className="text-[10px]">Sign Up</span>
            </Link>
            <Link
              href="/cart"
              className="flex flex-col items-center text-gray-600 hover:text-green-600"
            >
             <FontAwesomeIcon icon={faAddressCard}  className="text-lg mb-1" />
              <span className="text-[10px]">Log In</span>
            </Link>
          </div>
        </div>
      </div>


      {/* Navigation Menu    */}

      {/* <NavigationBar /> */}

      {/*  navigation menu  */}

    </div>
    
  );
}
