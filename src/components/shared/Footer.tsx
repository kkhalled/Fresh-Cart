"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterestP,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/freshcart-logo.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src={logo}
                alt="FreshCart Logo"
                width={140}
                height={40}
                priority
              />
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
              FreshCart is your trusted destination for fresh groceries,
              organic produce, and household essentials delivered directly
              to your doorstep.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                faFacebookF,
                faTwitter,
                faInstagram,
                faPinterestP,
              ].map((icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors"
                >
                  <FontAwesomeIcon icon={icon} className="text-sm" />
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <FooterColumn
            title="Categories"
            links={[
              { label: "Fruits & Vegetables", href: "/category/fruits" },
              { label: "Dairy & Eggs", href: "/category/dairy" },
              { label: "Bakery & Snacks", href: "/category/bakery" },
              { label: "Meat & Seafood", href: "/category/meat" },
              { label: "Beverages", href: "/category/beverages" },
            ]}
          />

          {/* Quick Links */}
          <FooterColumn
            title="Quick Links"
            links={[
              { label: "About Us", href: "/about" },
              { label: "Contact Us", href: "/contact" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Shipping Policy", href: "/shipping" },
            ]}
          />

          {/* Customer Service */}
          <FooterColumn
            title="Customer Service"
            links={[
              { label: "My Account", href: "/account" },
              { label: "Order History", href: "/orders" },
              { label: "Wishlist", href: "/wishlist" },
              { label: "Returns & Refunds", href: "/returns" },
              { label: "Help Center", href: "/help" },
            ]}
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-600 text-sm text-center sm:text-left">
            © {currentYear} FreshCart. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/privacy" className="hover:text-green-600 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-green-600 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-green-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Reusable Column Component */
function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-gray-800 font-semibold text-base mb-4">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-gray-600 text-sm hover:text-green-600 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}