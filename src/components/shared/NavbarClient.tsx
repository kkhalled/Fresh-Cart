"use client";

import React, { useState, useEffect, useCallback, ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCartShopping,
  faBars,
  faTimes,
  faSignOutAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppState } from "@/src/store/store";
import useLogout from "@/src/hooks/useLogout";
import { useCartCount } from "@/src/features/cart/hooks/useCartCount";
import logo from "../../assets/freshcart-logo.svg";

// Lazy-load the mobile drawer — only downloaded when the user opens it
const NavbarMobileMenu = dynamic(() => import("./NavbarMobileMenu"), {
  ssr: false,
});

interface NavbarClientProps {
  /** Server-rendered top bar passed as a ReactNode (RSC children-in-client pattern) */
  topBar: ReactNode;
}

export default function NavbarClient({ topBar }: NavbarClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAtTop, setIsAtTop] = useState(true);

  const isAuthenticated = useSelector(
    (state: AppState) => state.auth.isAuthenticated
  );
  const cartItemsCount = useCartCount();

  const { logout } = useLogout();

  // ── Scroll: hide top bar when user scrolls down ──────────────────────────
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsAtTop(window.scrollY < 10);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Body scroll lock when mobile menu is open ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // ── Close menus on resize to desktop ────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsMobileSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up search navigation
  };

  const handleLogout = useCallback(() => {
    setIsMobileMenuOpen(false);
    logout();
    toast.success("Logged out successfully", { autoClose: 1000 });
  }, [logout]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <>
      {/* ── TOP BAR (server HTML, visibility controlled by client scroll state) ── */}
      <div
        className={`hidden md:block bg-linear-to-r from-green-600 via-green-500 to-green-600 transition-all duration-500 ease-in-out overflow-hidden ${
          isAtTop ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {topBar}
      </div>

      {/* ── MAIN HEADER ───────────────────────────────────────────────────────── */}
      <div className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${!isAtTop ? "shadow-md border-b border-gray-100" : "border-b border-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="relative flex items-center justify-between h-16">

            {/* Mobile menu toggle */}
            <button
              onClick={() => {
                setIsMobileSearchOpen(false);
                setIsMobileMenuOpen((v) => !v);
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
                width={115}
                height={36}
                className="w-23.75 md:w-28.75"
                style={{ height: "auto" }}
                priority
              />
            </Link>

            {/* Desktop search */}
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

            {/* Mobile: search + cart icons */}
            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileSearchOpen((v) => !v);
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

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-6">
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

              <div className="h-8 w-px bg-gray-200" />

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

          {/* Mobile search bar (inline, below header) */}
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

      {/* ── MOBILE DRAWER (lazy loaded) ───────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <NavbarMobileMenu
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          onClose={closeMobileMenu}
        />
      )}
    </>
  );
}
