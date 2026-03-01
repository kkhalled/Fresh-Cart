"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faCreditCard,
  faLocationDot,
  faPhone,
  faCity,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/src/store/store";
import useCheckout from "../hooks/useCheckout";
import type { PaymentMethod } from "../types/checkout.types";
import type { CartItem } from "@/src/features/cart/types/cart.types";

/* ═══════════════════════════════════════════════════════════════════════════
   CheckoutScreen
   Two-column layout: shipping form (left) + order summary (right).
   Mobile: stacked.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function CheckoutScreen() {
  const router = useRouter();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  const {
    register,
    handleSubmit,
    errors,
    items,
    total,
    numOfCartItems,
    loading,
    paymentMethod,
    choosePaymentMethod,
    cartId,
  } = useCheckout();

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin?redirect=/checkout");
    }
  }, [isAuthenticated, router]);

  // Empty cart guard
  useEffect(() => {
    if (isAuthenticated && numOfCartItems === 0 && !loading) {
      router.push("/cart");
    }
  }, [isAuthenticated, numOfCartItems, loading, router]);

  if (!isAuthenticated || numOfCartItems === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900">Checkout</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Complete your order
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column — Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Payment Method */}
              <section>
                <h2 className="text-sm font-semibold text-neutral-900 mb-3">
                  Payment Method
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <PaymentOption
                    method="cash"
                    label="Cash on Delivery"
                    icon={faMoneyBill}
                    selected={paymentMethod === "cash"}
                    onSelect={choosePaymentMethod}
                  />
                  <PaymentOption
                    method="online"
                    label="Credit / Debit Card"
                    icon={faCreditCard}
                    selected={paymentMethod === "online"}
                    onSelect={choosePaymentMethod}
                  />
                </div>
              </section>

              {/* Shipping Address */}
              <section>
                <h2 className="text-sm font-semibold text-neutral-900 mb-3">
                  Shipping Address
                </h2>
                <div className="bg-white border border-neutral-200 rounded-lg p-5 space-y-4">
                  {/* Details */}
                  <div>
                    <label
                      htmlFor="details"
                      className="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-neutral-400">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="w-4 h-4"
                        />
                      </div>
                      <textarea
                        id="details"
                        rows={3}
                        {...register("details")}
                        className={`
                          w-full pl-10 pr-3 py-2.5 text-sm bg-white border rounded-lg resize-none
                          focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                          transition-colors
                          ${errors.details ? "border-red-400" : "border-neutral-300"}
                        `}
                        placeholder="123 Main Street, Apt 4B"
                      />
                    </div>
                    {errors.details && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.details.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-neutral-700 mb-1.5"
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                          <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          className={`
                            w-full pl-10 pr-3 py-2.5 text-sm bg-white border rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                            transition-colors
                            ${errors.phone ? "border-red-400" : "border-neutral-300"}
                          `}
                          placeholder="01012345678"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-neutral-700 mb-1.5"
                      >
                        City <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                          <FontAwesomeIcon icon={faCity} className="w-4 h-4" />
                        </div>
                        <input
                          id="city"
                          type="text"
                          {...register("city")}
                          className={`
                            w-full pl-10 pr-3 py-2.5 text-sm bg-white border rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                            transition-colors
                            ${errors.city ? "border-red-400" : "border-neutral-300"}
                          `}
                          placeholder="Cairo"
                        />
                      </div>
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column — Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-neutral-200 rounded-lg p-5 lg:sticky lg:top-8">
                <h2 className="text-sm font-semibold text-neutral-900 mb-4">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map((item: CartItem) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={item.imageCover}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover border border-neutral-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-neutral-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-neutral-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-neutral-900 shrink-0">
                        EGP {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-neutral-200 my-4" />

                {/* Totals */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">
                      Subtotal ({numOfCartItems} items)
                    </span>
                    <span className="text-neutral-900">
                      EGP {total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Shipping</span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-2 flex justify-between">
                    <span className="text-sm font-semibold text-neutral-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-neutral-900">
                      EGP {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full py-3 text-sm font-medium rounded-lg transition-all
                    bg-emerald-600 text-white hover:bg-emerald-700
                    disabled:opacity-50 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2
                  "
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : paymentMethod === "cash" ? (
                    "Place Order"
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>

                {/* Secure note */}
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-neutral-400">
                  <FontAwesomeIcon icon={faShieldHalved} className="w-3 h-3" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Payment Option Card ──────────────────────────────────────────────── */

function PaymentOption({
  method,
  label,
  icon,
  selected,
  onSelect,
}: {
  method: PaymentMethod;
  label: string;
  icon: any;
  selected: boolean;
  onSelect: (m: PaymentMethod) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(method)}
      className={`
        flex items-center gap-3 px-4 py-3.5 rounded-lg border text-sm font-medium transition-all
        ${
          selected
            ? "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500/20"
            : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
        }
      `}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`w-5 h-5 ${selected ? "text-emerald-600" : "text-neutral-400"}`}
      />
      <span>{label}</span>
    </button>
  );
}
