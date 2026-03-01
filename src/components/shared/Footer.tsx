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
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/freshcart-logo.svg";

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Deals of the Day", href: "/deals" },
  { label: "Brands", href: "/brands" },
  { label: "Categories", href: "/categories" },
];

const accountLinks = [
  { label: "My Account", href: "/account" },
  { label: "My Orders", href: "/orders" },
  { label: "All Orders", href: "/allorders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Shopping Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
];

const authLinks = [
  { label: "Sign In", href: "/signin" },
  { label: "Create Account", href: "/signup" },
  { label: "Forgot Password", href: "/forgot-password" },
];

const socials = [
  { icon: faFacebookF, href: "#", label: "Facebook" },
  { icon: faTwitter, href: "#", label: "Twitter" },
  { icon: faInstagram, href: "#", label: "Instagram" },
  { icon: faPinterestP, href: "#", label: "Pinterest" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Image
                src={logo}
                alt="FreshCart"
                width={140}
                height={40}
                style={{ height: "auto" }}
                priority
              />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Your trusted destination for fresh groceries, organic produce, and
              household essentials — delivered straight to your door.
            </p>

            {/* Contact info */}
            <ul className="space-y-2 mb-6 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} className="w-3.5 text-green-600 shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="w-3.5 text-green-600 shrink-0" />
                <span>support@freshcart.com</span>
              </li>
              <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faLocationDot} className="w-3.5 text-green-600 mt-0.5 shrink-0" />
                <span>123 Green St, New York, NY 10001</span>
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors"
                >
                  <FontAwesomeIcon icon={icon} className="text-sm" />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <FooterColumn title="Shop" links={shopLinks} />

          {/* Account Column */}
          <FooterColumn title="My Account" links={accountLinks} />

          {/* Auth / Help Column */}
          <div>
            <FooterColumn title="Account Access" links={authLinks} />

            <div className="mt-8">
              <h4 className="text-gray-800 font-semibold text-sm mb-3">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                {["Visa", "Mastercard", "PayPal", "Amex"].map((card) => (
                  <span
                    key={card}
                    className="px-2.5 py-1 border border-gray-200 rounded text-xs text-gray-500 font-medium bg-gray-50"
                  >
                    {card}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {currentYear} FreshCart. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs">
            Built with ❤️ for fresh living
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-gray-800 font-semibold text-sm mb-4 uppercase tracking-wide">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-gray-500 text-sm hover:text-green-600 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

