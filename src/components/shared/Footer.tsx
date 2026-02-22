import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faPinterestP 
} from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/freshcart-logo.svg'
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className=" border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
           <div className="flex items-center">
            <span className="text-2xl font-bold">
              <Image src={logo} alt="FreshCart Logo" width={150} height={50} />
            </span>
          </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              FreshCart is your one-stop destination for fresh groceries, organic produce, and household essentials delivered right to your doorstep.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-sm" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-sm" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-sm" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors"
              >
                <FontAwesomeIcon icon={faPinterestP} className="text-sm" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-gray-800 font-semibold text-base mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Fruits & Vegetables
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Dairy & Eggs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Bakery & Snacks
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Meat & Seafood
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Beverages
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Shipping Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-gray-800 font-semibold text-base mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Order History
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-gray-600 text-sm">
            © 2023 FreshCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}