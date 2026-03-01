"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faRotateRight,
  faTruckFast,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import type { BackendOrder } from "../types/order.types";
import {
  deriveOrderStatus,
  STATUS_CONFIG,
  formatOrderDate,
} from "../utils/order.utils";

/* ═══════════════════════════════════════════════════════════════════════════
   OrderCard
   Compact order summary card with status badge, product previews,
   totals, and expandable details section.
   ═══════════════════════════════════════════════════════════════════════════ */

interface OrderCardProps {
  order: BackendOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = deriveOrderStatus(order);
  const config = STATUS_CONFIG[status];
  const itemCount = order.cartItems.reduce((sum, i) => sum + i.count, 0);
  const previewItems = order.cartItems.slice(0, 3);
  const extraCount = order.cartItems.length - 3;

  return (
    <article className="bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              Order #{order._id.slice(-8).toUpperCase()}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              {formatOrderDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Status badge */}
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Product thumbnails */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {previewItems.map((item) => (
                <img
                  key={item._id}
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-10 h-10 rounded-lg border-2 border-white object-cover"
                />
              ))}
              {extraCount > 0 && (
                <div className="w-10 h-10 rounded-lg border-2 border-white bg-neutral-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-neutral-500">
                    +{extraCount}
                  </span>
                </div>
              )}
            </div>
            <span className="text-xs text-neutral-500 ml-1">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>

          {/* Total */}
          <div className="text-right shrink-0">
            <p className="text-sm font-semibold text-neutral-900">
              EGP {order.totalOrderPrice.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-xs text-neutral-500 mt-0.5 justify-end">
              <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" />
              <span>{order.shippingAddress?.city || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Expanded Items Section ────────────────────────────────────── */}
      {isExpanded && (
        <div className="px-5 py-4 border-t border-neutral-100 bg-neutral-50 animate-fade-in">
          <h3 className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-3">
            Order Items
          </h3>
          <div className="space-y-3">
            {order.cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 bg-white p-3 rounded-lg border border-neutral-200"
              >
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-14 h-14 rounded-lg object-cover border border-neutral-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {item.product.title}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Qty: {item.count} × EGP {item.price.toLocaleString()}
                  </p>
                </div>
                <p className="text-sm font-semibold text-neutral-900 shrink-0">
                  EGP {(item.price * item.count).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <h4 className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                Shipping Address
              </h4>
              <div className="text-sm text-neutral-600 space-y-1">
                {order.shippingAddress.details && (
                  <p>{order.shippingAddress.details}</p>
                )}
                <p className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 text-neutral-400" />
                  {order.shippingAddress.city}
                </p>
                {order.shippingAddress.phone && (
                  <p className="text-neutral-500">{order.shippingAddress.phone}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Footer Actions ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-5 py-3 border-t border-neutral-100">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="
            inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md
            bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors
          "
        >
          {isExpanded ? "Hide" : "View"} Details
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`w-2.5 h-2.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>

        {status !== "delivered" ? (
          <button
            type="button"
            className="
              inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md
              bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors
            "
          >
            <FontAwesomeIcon icon={faTruckFast} className="w-3 h-3" />
            Track Order
          </button>
        ) : (
          <button
            type="button"
            className="
              inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md
              bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors
            "
          >
            <FontAwesomeIcon icon={faRotateRight} className="w-3 h-3" />
            Reorder
          </button>
        )}
      </div>
    </article>
  );
}
