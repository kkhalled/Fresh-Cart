import Link from "next/link";
import SummaryRow from "./SummaryRow";

interface AppliedCoupon {
  code: string;
  discountAmount: number;
}

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  itemCount: number;
  coupon: AppliedCoupon | null;
  isGuest?: boolean;
}

export default function OrderSummary({
  subtotal,
  shipping,
  discount,
  tax,
  total,
  itemCount,
  coupon,
  isGuest = false,
}: OrderSummaryProps) {
  const isFreeshipping = shipping === 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col gap-0">
      <h2 className="text-base font-bold text-gray-900 mb-4">Order Summary</h2>

      {/* Summary rows */}
      <div className="divide-y divide-gray-100">
        <SummaryRow
          label={`Subtotal (${itemCount} ${itemCount === 1 ? "item" : "items"})`}
          value={`$${subtotal.toFixed(2)}`}
        />
        <SummaryRow
          label="Shipping"
          value={isFreeshipping ? "Free" : `$${shipping.toFixed(2)}`}
          valueClassName={isFreeshipping ? "text-primary-600 font-semibold" : "text-gray-900"}
        />
        {coupon && discount > 0 && (
          <SummaryRow
            label={`Discount (${coupon.code})`}
            value={`-$${discount.toFixed(2)}`}
            valueClassName="text-red-500 font-semibold"
            labelClassName="text-gray-500"
          />
        )}
        <SummaryRow label="Tax" value={`$${tax.toFixed(2)}`} />
      </div>

      {/* Total */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-200">
        <span className="text-base font-bold text-gray-900">Total</span>
        <span className="text-xl font-extrabold text-gray-900">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* CTAs */}
      <div className="mt-6 flex flex-col gap-3">
        {isGuest ? (
          <Link
            href="/signin?redirect=/cart"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 active:bg-primary-800 transition-colors duration-150 shadow-sm shadow-primary-200"
          >
            Sign in to Checkout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        ) : (
          <Link
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 active:bg-primary-800 transition-colors duration-150 shadow-sm shadow-primary-200"
          >
            Proceed to Checkout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}

        <Link
          href="/products"
          className="w-full flex items-center justify-center px-6 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100 transition-colors duration-150"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Trust badges */}
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-primary-50 border border-primary-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-primary-600 mt-0.5 shrink-0"
            aria-hidden="true"
          >
            <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 0 0 2 4.607V10.5h9V4.606c0-.771-.59-1.43-1.375-1.489A41.568 41.568 0 0 0 6.5 3ZM2 12v2.5A1.5 1.5 0 0 0 3.5 16h.041a3 3 0 0 1 5.918 0h.791a.75.75 0 0 0 .75-.75V12H2Z" />
            <path d="M6.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM13.25 5a.75.75 0 0 0-.75.75v8.514a3.001 3.001 0 0 1 4.893 1.44c.37-.275.607-.714.607-1.204V7.871a1.5 1.5 0 0 0-.972-1.393l-3.078-1.124A.75.75 0 0 0 13.25 5ZM14.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          </svg>
          <div>
            <p className="text-xs font-semibold text-primary-700">Free Delivery</p>
            <p className="text-xs text-primary-600 mt-0.5 leading-relaxed">
              Your order qualifies for free delivery. Estimated delivery: 2–3 business days
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-gray-500 mt-0.5 shrink-0"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.563 2 12.162 2 7c0-.538.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-xs font-semibold text-gray-700">Secure Checkout</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              Your payment information is protected with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
