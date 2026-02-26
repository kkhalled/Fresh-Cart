import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

/**
 * Server component — pure static HTML, zero client JS.
 * Rendered once on the server and streamed as HTML.
 * Passed as a ReactNode prop into NavbarClient so the client
 * wrapper can control its scroll-based visibility.
 */
export default function NavbarTopBar() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-center h-9">
        {/* Left: Promo text */}
        <div className="flex items-center gap-2 text-white text-xs">
          <FontAwesomeIcon icon={faTruck} className="text-[11px]" />
          <span className="font-medium">
            Free delivery on orders over $50 | Same-day delivery available
          </span>
        </div>

        {/* Right: Static links + locale labels */}
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
          {/* Static locale labels — interactive version lives in NavbarMobileMenu */}
          <span className="font-medium text-white/80">USD</span>
          <span className="text-green-300">|</span>
          <span className="font-medium text-white/80">EN</span>
        </div>
      </div>
    </div>
  );
}
