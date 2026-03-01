"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShieldHalved, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

interface AccountLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    href: "/account",
    label: "Profile",
    icon: faUser,
  },
  {
    href: "/account/security",
    label: "Security",
    icon: faShieldHalved,
  },
  {
    href: "/account/addresses",
    label: "Addresses",
    icon: faMapMarkerAlt,
  },
];

export default function AccountLayout({ children }: AccountLayoutProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/account") {
      return pathname === "/account" || pathname === "/account/profile";
    }
    return pathname === href;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Account Settings
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your profile and security preferences
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-48 shrink-0">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${
                      isActive(item.href)
                        ? "bg-emerald-50 text-emerald-700 border-l-2 border-emerald-600 -ml-0.5"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }
                  `}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`w-4 h-4 ${
                      isActive(item.href) ? "text-emerald-600" : "text-neutral-400"
                    }`}
                  />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Mobile Tab Navigation */}
          <div className="md:hidden">
            <div className="flex border-b border-neutral-200">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium flex-1 transition-colors
                    ${
                      isActive(item.href)
                        ? "text-emerald-600 border-b-2 border-emerald-600 -mb-px"
                        : "text-neutral-500 hover:text-neutral-700"
                    }
                  `}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 max-w-xl">{children}</main>
        </div>
      </div>
    </div>
  );
}
