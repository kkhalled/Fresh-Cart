import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════════════
   EmptyOrders
   Shown when the user has no orders yet.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-5">
        <FontAwesomeIcon
          icon={faBoxOpen}
          className="w-9 h-9 text-neutral-400"
        />
      </div>
      <h2 className="text-lg font-semibold text-neutral-900 mb-1">
        No orders yet
      </h2>
      <p className="text-sm text-neutral-500 max-w-xs mb-6">
        When you place an order, it will appear here so you can track its
        progress.
      </p>
      <Link
        href="/products"
        className="
          inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg
          bg-emerald-600 text-white hover:bg-emerald-700 transition-colors
          focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2
        "
      >
        Start Shopping
      </Link>
    </div>
  );
}
