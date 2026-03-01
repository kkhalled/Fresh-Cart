"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faHeart,
  faMapMarkerAlt,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface QuickLinkCardProps {
  icon: any;
  title: string;
  description: string;
  href: string;
  color: string;
}

function QuickLinkCard({
  icon,
  title,
  description,
  href,
  color,
}: QuickLinkCardProps) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md hover:border-primary-200 transition-all duration-200"
    >
      <div
        className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
      >
        <FontAwesomeIcon icon={icon} className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  );
}

export default function AccountQuickLinks() {
  const links = [
    {
      icon: faBox,
      title: "My Orders",
      description: "Track and manage your orders",
      href: "/orders",
      color: "bg-blue-500",
    },
    {
      icon: faHeart,
      title: "Wishlist",
      description: "View your saved items",
      href: "/wishlist",
      color: "bg-red-500",
    },
    {
      icon: faMapMarkerAlt,
      title: "Addresses",
      description: "Manage delivery addresses",
      href: "/addresses",
      color: "bg-green-500",
    },
    {
      icon: faCreditCard,
      title: "Payment Methods",
      description: "Manage payment options",
      href: "/payment-methods",
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {links.map((link) => (
          <QuickLinkCard key={link.title} {...link} />
        ))}
      </div>
    </div>
  );
}
