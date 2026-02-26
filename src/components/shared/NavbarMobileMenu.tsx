"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faSignOutAlt,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import logo from "../../assets/freshcart-logo.svg";

interface NavbarMobileMenuProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  onClose: () => void;
}

export default function NavbarMobileMenu({
  isAuthenticated,
  onLogout,
  onClose,
}: NavbarMobileMenuProps) {
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("English");

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 h-dvh z-40 md:hidden backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide Menu */}
      <aside
        className="fixed top-0 left-0 h-dvh w-70 max-w-[85vw] bg-white z-50 shadow-2xl md:hidden overflow-y-auto overscroll-contain"
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
              style={{ height: "auto" }}
              className="w-27.5"
            />
            <button
              onClick={onClose}
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
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="text-green-600" />
                  </div>
                  <span className="text-gray-800 font-semibold">My Account</span>
                </Link>
                <Link
                  href="/wishlist"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faHeart} className="text-pink-600" />
                  </div>
                  <span className="text-gray-800 font-semibold">Wishlist</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-red-600" />
                  </div>
                  <span className="text-gray-800 font-semibold">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={onClose}
                  className="block w-full bg-linear-to-r from-green-600 to-green-500 text-white text-center py-3 rounded-xl font-bold hover:from-green-700 hover:to-green-600 transition-all shadow-md"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={onClose}
                  className="block w-full border-2 border-green-600 text-green-600 text-center py-3 rounded-xl font-bold hover:bg-green-50 transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Quick Links */}
          <nav className="space-y-1 mb-6">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
              Quick Access
            </h3>
            <Link
              href="/track-order"
              onClick={onClose}
              className="flex items-center gap-3 py-3.5 px-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-sm w-4" />
              Track Order
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center gap-3 py-3.5 px-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center gap-3 py-3.5 px-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
            >
              Contact &amp; Help
            </Link>
          </nav>

          {/* Preferences */}
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
              <FontAwesomeIcon icon={faPhone} className="text-xs w-3" />
              <span className="font-medium">+1 (800) 123-4567</span>
            </Link>
            <Link
              href="mailto:support@freshcart.com"
              className="flex items-center gap-2 text-gray-700 hover:text-green-600 text-sm transition-colors"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-xs w-3" />
              <span className="font-medium">support@freshcart.com</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
