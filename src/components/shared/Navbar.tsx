"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faSearch,
  faCartShopping,
  faChevronDown,
  faSignOutAlt,
  faUserPlus,
  faBars,
  faTimes,
  faMapMarkerAlt,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";

import logo from "../../assets/freshcart-logo.svg";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AppState } from "@/src/store/store";
import { toast } from "react-toastify";
import useLogout from "@/src/hooks/useLogout";


export default function Navbar() {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAtTop, setIsAtTop] = useState(true);

  const isAuthenticated = useSelector(
    (state: AppState) => state.auth.isAuthenticated,
  );
  const cartItemsCount = 3;

  // Scroll effect - hide navbar when not at top
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY;
        setIsAtTop(scrollPosition < 10);
      }, 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
        if (isMobileSearchOpen) {
          setIsMobileSearchOpen(false);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen, isMobileSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const { logout } = useLogout();

  const handleLogout = async () => {
    setIsMobileMenuOpen(false);
    logout();
    toast.success("Logged out successfully", { autoClose: 1000 });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* ===== TOP BAR - Desktop Only ===== */}
      <div
        className={`hidden md:block bg-linear-to-r from-green-600 via-green-500 to-green-600 transition-all duration-500 ease-in-out overflow-hidden ${
          isAtTop ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-9">
            {/* Left: Promo Banner */}
            <div className="flex items-center gap-2 text-white text-xs">
              <FontAwesomeIcon icon={faTruck} className="text-[11px]" />
              <span className="font-medium">
                Free delivery on orders over $50 | Same-day delivery available
              </span>
            </div>

            {/* Right: Links & Settings */}
            <div className="flex items-center gap-3 text-white text-xs">
              <Link
                href="/track-order"
                className="hover:text-green-100 transition-colors font-medium"
              >
                Track Order
              </Link>
              <span className="text-green-300">|</span>
              <Link
                href="/about"
                className="hover:text-green-100 transition-colors font-medium"
              >
                About
              </Link>
              <span className="text-green-300">|</span>
              <Link
                href="/contact"
                className="hover:text-green-100 transition-colors font-medium"
              >
                Help
              </Link>
              <span className="text-green-300 mx-1">|</span>

              {/* Currency */}
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="appearance-none bg-transparent text-white pr-4 cursor-pointer focus:outline-none font-medium text-xs hover:text-green-100 transition-colors"
                  aria-label="Select currency"
                >
                  <option value="USD" className="text-gray-800">
                    USD
                  </option>
                  <option value="EGP" className="text-gray-800">
                    EGP
                  </option>
                  <option value="EUR" className="text-gray-800">
                    EUR
                  </option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px] pointer-events-none"
                />
              </div>

              {/* Language */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="appearance-none bg-transparent text-white pr-4 cursor-pointer focus:outline-none font-medium text-xs hover:text-green-100 transition-colors"
                  aria-label="Select language"
                >
                  <option value="English" className="text-gray-800">
                    EN
                  </option>
                  <option value="Arabic" className="text-gray-800">
                    AR
                  </option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px] pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN HEADER ===== */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="relative flex items-center justify-between h-16 ">
            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsMobileSearchOpen(false);
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="md:hidden text-gray-700 hover:text-green-600 p-2 -ml-2 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                className="text-md"
              />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center shrink-0 md:static md:translate-x-0"
            >
              <Image
                src={logo}
                alt="FreshCart"
                width={95}
                height={30}
                className="md:w-28.75"
                priority
              />
            </Link>

            {/* Search Bar - Desktop */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex flex-1 max-w-xl mx-8"
            >
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="text-gray-400 text-sm group-focus-within:text-green-600 transition-colors"
                  />
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search fresh groceries..."
                  className="w-full pl-11 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50 focus:bg-white placeholder:text-gray-400"
                  aria-label="Search products"
                />
              </div>
            </form>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileSearchOpen(!isMobileSearchOpen);
                }}
                className="text-gray-700 hover:text-green-600 p-2 transition-colors"
                aria-label="Toggle search"
                aria-expanded={isMobileSearchOpen}
              >
                <FontAwesomeIcon icon={faSearch} className="text-md" />
              </button>
              <Link
                href="/cart"
                className="relative text-gray-700 hover:text-green-600 p-2 transition-colors"
                aria-label={`Shopping cart with ${cartItemsCount} items`}
              >
                <FontAwesomeIcon icon={faCartShopping} className="text-md" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-green-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-6">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors group"
                aria-label="View wishlist"
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-md group-hover:scale-110 transition-transform"
                />
                <span className="text-sm font-semibold hidden lg:block">
                  Wishlist
                </span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors group"
                aria-label={`Shopping cart with ${cartItemsCount} items`}
              >
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="text-md group-hover:scale-110 transition-transform"
                  />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold hidden lg:block">
                  Cart
                </span>
              </Link>

              {/* Divider */}
              <div className="h-8 w-px bg-gray-200"></div>

              {/* Auth Actions */}
              {isAuthenticated ? (
                <>
                  <Link
                    href="/account"
                    className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors group"
                    aria-label="My account"
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-md group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-semibold hidden lg:block">
                      Account
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors group"
                    aria-label="Log out"
                  >
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="text-md group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-semibold hidden lg:block">
                      Logout
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors group"
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-md group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-semibold hidden lg:block">
                      Sign In
                    </span>
                  </Link>
                  <Link
                    href="/signup"
                    className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors group"
                  >
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="text-md group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-semibold hidden lg:block">
                      Sign Up
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          {isMobileSearchOpen && (
            <form
              onSubmit={handleSearch}
              className="pb-3 lg:hidden animate-fade-in"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="text-gray-400 text-sm"
                  />
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                  autoFocus
                  aria-label="Search products"
                />
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ===== NAVIGATION BAR ===== */}
    

      {/* ===== MOBILE MENU ===== */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 h-dvh z-40 md:hidden backdrop-blur-sm transition-opacity duration-200"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Slide Menu */}
          <aside
            className="fixed top-0 left-0 h-dvh w-70 max-w-[85vw] bg-white z-50 shadow-2xl md:hidden overflow-y-auto overscroll-contain transition-transform duration-200"
            role="dialog"
            aria-label="Mobile navigation menu"
            aria-modal="true"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <Image
                  src={logo}
                  alt="FreshCart"
                  width={110}
                  height={36}
                  className="h-8 w-auto"
                />
                <button
                  onClick={closeMobileMenu}
                  className="text-gray-600 hover:text-green-600 p-2 transition-colors"
                  aria-label="Close menu"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xl" />
                </button>
              </div>

              {/* User Section */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/account"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-green-600"
                        />
                      </div>
                      <span className="text-gray-800 font-semibold">
                        My Account
                      </span>
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="text-pink-600"
                        />
                      </div>
                      <span className="text-gray-800 font-semibold">
                        Wishlist
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-left"
                    >
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          className="text-red-600"
                        />
                      </div>
                      <span className="text-gray-800 font-semibold">
                        Logout
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      onClick={closeMobileMenu}
                      className="block w-full bg-linear-to-r from-green-600 to-green-500 text-white text-center py-3 rounded-xl font-bold hover:from-green-700 hover:to-green-600 transition-all shadow-md"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={closeMobileMenu}
                      className="block w-full border-2 border-green-600 text-green-600 text-center py-3 rounded-xl font-bold hover:bg-green-50 transition-all"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              {/* Rest of your menu unchanged */}

              {/* Quick Links */}
              <nav className="space-y-1 mb-6">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Quick Access
                </h3>
                <Link
                  href="/track-order"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 py-2.5 px-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-sm" />
                  Track Order
                </Link>
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 py-2.5 px-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 py-2.5 px-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                >
                  Contact & Help
                </Link>
              </nav>

              {/* Settings */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Preferences
                </h3>

                <div>
                  <label
                    htmlFor="mobile-currency"
                    className="block text-xs text-gray-600 mb-2 px-2 font-semibold"
                  >
                    Currency
                  </label>
                  <select
                    id="mobile-currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm font-medium"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EGP">EGP - Egyptian Pound</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="mobile-language"
                    className="block text-xs text-gray-600 mb-2 px-2 font-semibold"
                  >
                    Language
                  </label>
                  <select
                    id="mobile-language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm font-medium"
                  >
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-6 pt-6 border-t border-gray-200 bg-gray-50 -mx-5 px-5 py-4 rounded-t-3xl">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Get in Touch
                </h3>
                <Link
                  href="tel:+18001234567"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 mb-2 text-sm transition-colors"
                >
                  <FontAwesomeIcon icon={faPhone} className="text-xs" />
                  <span className="font-medium">+1 (800) 123-4567</span>
                </Link>
                <Link
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 text-sm transition-colors"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                  <span className="font-medium">support@freshcart.com</span>
                </Link>
              </div>
            </div>
          </aside>
        </>
      )}
    </nav>
  );
}
