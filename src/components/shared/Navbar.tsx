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
} from "@fortawesome/free-solid-svg-icons";

import {
  faAddressCard,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

import logo from "../../assets/freshcart-logo.svg";
import NavigationBar from "./NavigationBar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AppState } from "@/src/store/store";

/**
 * Main Navigation Component
 * 
 * Features:
 * - Responsive design (mobile & desktop)
 * - Multi-language support
 * - Multi-currency support
 * - User authentication states
 * - Mobile slide-out menu
 * - Search functionality
 * - Shopping cart integration
 * 
 * @component
 */
export default function Navbar() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  
  /** Selected language state */
  const [language, setLanguage] = useState("English");
  
  /** Selected currency state */
  const [currency, setCurrency] = useState("USD");
  
  /** Mobile menu open/close state */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  /** Mobile search bar visibility state */
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  /** Search query input state */
  const [searchQuery, setSearchQuery] = useState("");
  
  /** Check if user is authenticated from Redux store */
  const isAuthenticated = useSelector(
    (state: AppState) => state.auth.isAuthenticated,
  );

  /** Get cart items count from Redux store (example - adjust to your store structure) */
  const cartItemsCount = 3;

  // ==========================================
  // SIDE EFFECTS
  // ==========================================
  
  /**
   * Prevent body scroll when mobile menu is open
   * This improves UX by preventing background scroll
   */
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  /**
   * Close mobile menu on window resize to desktop
   * Prevents menu staying open when switching to desktop view
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // ==========================================
  // EVENT HANDLERS
  // ==========================================
  
  /**
   * Handle search submission
   * @param {React.FormEvent} e - Form event
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or trigger search
      console.log("Searching for:", searchQuery);
      // Example: router.push(`/search?q=${searchQuery}`);
    }
  };

  /**
   * Handle logout action
   * Clears user session and redirects
   */
  const handleLogout = () => {
    // Dispatch logout action
    // dispatch(logout());
    setIsMobileMenuOpen(false);
    console.log("User logged out");
  };

  /**
   * Close mobile menu
   * Used by multiple components to close the menu
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // ==========================================
  // RENDER
  // ==========================================
  
  return (
    <nav className="w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* ==========================================
          TOP BAR - Contact & Settings
          Hidden on mobile, visible on desktop
          ========================================== */}
      <div className="hidden md:block bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-xs">
          {/* Left side - Contact information */}
          <div className="flex items-center gap-6">
            <Link
              href="tel:+18001234567"
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
              aria-label="Call customer service"
            >
              <FontAwesomeIcon icon={faPhone} className="text-xs" />
              <span>+1 (800) 123-4567</span>
            </Link>
            <Link
              href="mailto:support@freshcart.com"
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
              aria-label="Email customer support"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
              <span>support@freshcart.com</span>
            </Link>
          </div>
          
          {/* Right side - Quick links & settings */}
          <div className="flex items-center gap-4">
            <Link 
              href="/track-order" 
              className="text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              Track Order
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              Contact
            </Link>
            
            {/* Currency selector */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="appearance-none bg-transparent text-gray-600 hover:text-green-600 pr-6 cursor-pointer focus:outline-none transition-colors duration-200"
                aria-label="Select currency"
              >
                <option value="USD">USD</option>
                <option value="EGP">EGP</option>
                <option value="EUR">EUR</option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-gray-600 pointer-events-none"
              />
            </div>
            
            {/* Language selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none bg-transparent text-gray-600 hover:text-green-600 pr-6 cursor-pointer focus:outline-none transition-colors duration-200"
                aria-label="Select language"
              >
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-gray-600 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          MAIN HEADER - Logo, Search, Actions
          Responsive layout for all screen sizes
          ========================================== */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center gap-4">
            
            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-green-600 p-2 -ml-2 transition-colors duration-200"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <FontAwesomeIcon 
                icon={isMobileMenuOpen ? faTimes : faBars} 
                className="text-xl" 
              />
            </button>

            {/* Logo - Links to homepage - SMALLER SIZE */}
            <Link href="/" className="flex items-center shrink-0">
              <Image 
                src={logo} 
                alt="FreshCart - Fresh Groceries Delivered" 
                width={100} 
                height={32} 
                className="md:w-30"
                priority
              />
            </Link>

            {/* Desktop Search Bar - SMALLER & CLEANER */}
            <form 
              onSubmit={handleSearch}
              className="hidden lg:flex flex-1 max-w-xl mx-6"
            >
              <div className="relative w-full">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full px-3.5 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  aria-label="Search products"
                />
                <button 
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                  aria-label="Submit search"
                >
                  <FontAwesomeIcon icon={faSearch} className="text-sm" />
                </button>
              </div>
            </form>

            {/* Mobile Quick Actions - Search & Cart only */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="text-gray-600 hover:text-green-600 p-2 transition-colors duration-200"
                aria-label="Toggle search"
                aria-expanded={isMobileSearchOpen}
              >
                <FontAwesomeIcon icon={faSearch} className="text-lg" />
              </button>
              <Link 
                href="/cart" 
                className="relative text-gray-600 hover:text-green-600 p-2 transition-colors duration-200"
                aria-label={`Shopping cart with ${cartItemsCount} items`}
              >
                <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Desktop Action Icons - Full navigation */}
            <div className="hidden md:flex items-center gap-3 lg:gap-5">
              
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors duration-200 group"
                aria-label="View wishlist"
              >
                <FontAwesomeIcon 
                  icon={faHeart} 
                  className="text-[18px] mb-1 group-hover:scale-110 transition-transform duration-200" 
                />
                <span className="text-[10px] font-medium">Wishlist</span>
              </Link>

              {/* Shopping Cart with badge */}
              <Link
                href="/cart"
                className="flex flex-col items-center text-gray-600 hover:text-green-600 relative transition-colors duration-200 group"
                aria-label={`Shopping cart with ${cartItemsCount} items`}
              >
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="text-[18px] mb-1 group-hover:scale-110 transition-transform duration-200"
                  />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">Cart</span>
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors duration-200 group"
                aria-label="My account"
              >
                <FontAwesomeIcon 
                  icon={faUser} 
                  className="text-[18px] mb-1 group-hover:scale-110 transition-transform duration-200" 
                />
                <span className="text-[10px] font-medium">Account</span>
              </Link>

              {/* Authentication Actions - Conditional rendering */}
              {isAuthenticated ? (
                // Logout button for authenticated users
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center text-gray-600 hover:text-red-600 transition-colors duration-200 group"
                  aria-label="Log out"
                >
                  <FontAwesomeIcon 
                    icon={faSignOutAlt} 
                    className="text-[18px] mb-1 group-hover:scale-110 transition-transform duration-200" 
                  />
                  <span className="text-[10px] font-medium">Log Out</span>
                </button>
              ) : (
                // Sign Up & Sign In for guest users
                <React.Fragment>
                  <Link
                    href="/signup"
                    className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors duration-200 group"
                    aria-label="Sign up"
                  >
                    <FontAwesomeIcon 
                      icon={faUserPlus} 
                      className="text-[18px] mb-1 group-hover:scale-110 transition-transform duration-200" 
                    />
                    <span className="text-[10px] font-medium">Sign Up</span>
                  </Link>
                  <Link
                    href="/signin"
                    className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors duration-200 group"
                    aria-label="Sign in"
                  >
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      className="text-[18px] mb-1 group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="text-[10px] font-medium">Log In</span>
                  </Link>
                </React.Fragment>
              )}
            </div>
          </div>

          {/* Mobile Search Bar - Expandable - CLEANER SIZE */}
          {isMobileSearchOpen && (
            <form 
              onSubmit={handleSearch}
              className="mt-3 lg:hidden transition-all duration-200"
            >
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full px-3.5 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  autoFocus
                  aria-label="Search products"
                />
                <button 
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                  aria-label="Submit search"
                >
                  <FontAwesomeIcon icon={faSearch} className="text-sm" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ==========================================
          MOBILE MENU DRAWER
          Slide-in menu from left with backdrop
          ========================================== */}
      {isMobileMenuOpen && (
        <React.Fragment>
          {/* Backdrop overlay - Closes menu on click */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity duration-200"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          
          {/* Sliding menu panel */}
          <aside 
            className="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl transition-transform duration-300 md:hidden overflow-y-auto"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <div className="p-6">
              
              {/* Close button */}
              <button
                onClick={closeMobileMenu}
                className="absolute top-4 right-4 text-gray-600 hover:text-green-600 p-2 transition-colors duration-200"
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>

              {/* Menu Logo - SMALLER */}
              <div className="mb-8 pr-8">
                <Image 
                  src={logo} 
                  alt="FreshCart" 
                  width={130} 
                  height={42}
                />
              </div>

              {/* ========================================
                  USER ACTIONS SECTION
                  Different content for auth vs guest
                  ======================================== */}
              <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
                {isAuthenticated ? (
                  // Authenticated user menu
                  <React.Fragment>
                    <Link
                      href="/account"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faUser} className="text-gray-600 text-lg" />
                      <span className="text-gray-700 font-medium">My Account</span>
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faHeart} className="text-gray-600 text-lg" />
                      <span className="text-gray-700 font-medium">Wishlist</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200 text-left"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-600 text-lg" />
                      <span className="text-gray-700 font-medium">Log Out</span>
                    </button>
                  </React.Fragment>
                ) : (
                  // Guest user CTA buttons
                  <React.Fragment>
                    <Link
                      href="/signin"
                      onClick={closeMobileMenu}
                      className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={closeMobileMenu}
                      className="block w-full border-2 border-green-600 text-green-600 text-center py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200"
                    >
                      Sign Up
                    </Link>
                  </React.Fragment>
                )}
              </div>

              {/* ========================================
                  QUICK LINKS SECTION
                  ======================================== */}
              <nav className="space-y-2 mb-8" aria-label="Quick links">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Quick Links
                </h3>
                <Link
                  href="/track-order"
                  onClick={closeMobileMenu}
                  className="block py-2 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium"
                >
                  Track Order
                </Link>
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className="block py-2 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="block py-2 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium"
                >
                  Contact
                </Link>
              </nav>

              {/* ========================================
                  SETTINGS SECTION
                  Currency & Language selectors
                  ======================================== */}
              <div className="space-y-4 pt-8 border-t border-gray-200">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Settings
                </h3>
                
                {/* Currency selector */}
                <div>
                  <label 
                    htmlFor="mobile-currency" 
                    className="block text-sm text-gray-600 mb-2 font-medium"
                  >
                    Currency
                  </label>
                  <select
                    id="mobile-currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white transition-all duration-200"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EGP">EGP - Egyptian Pound</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>

                {/* Language selector */}
                <div>
                  <label 
                    htmlFor="mobile-language" 
                    className="block text-sm text-gray-600 mb-2 font-medium"
                  >
                    Language
                  </label>
                  <select
                    id="mobile-language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white transition-all duration-200"
                  >
                    <option value="English">English</option>
                    <option value="Arabic">العربية (Arabic)</option>
                  </select>
                </div>
              </div>

              {/* ========================================
                  CONTACT SECTION
                  ======================================== */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Contact Us
                </h3>
                <Link
                  href="tel:+18001234567"
                  className="flex items-center gap-3 text-gray-600 hover:text-green-600 mb-3 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faPhone} className="text-sm" />
                  <span className="text-sm font-medium">+1 (800) 123-4567</span>
                </Link>
                <Link
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                  <span className="text-sm font-medium">support@freshcart.com</span>
                </Link>
              </div>
            </div>
          </aside>
        </React.Fragment>
      )}

      {/* ==========================================
          NAVIGATION MENU (Optional)
          Can be uncommented for category navigation
          ========================================== */}
      {/* <NavigationBar /> */}
    </nav>
  );
}