import { ReactNode } from "react";

interface CartPageLayoutProps {
  header: ReactNode;
  cartItems: ReactNode;

  summary: ReactNode;
}

/**
 * Two-column grid layout for the cart page.
 * Desktop: items left (2/3), summary sticky right (1/3)
 * Mobile/Tablet: single stacked column
 */
export default function CartPageLayout({
  header,
  cartItems,

  summary,
}: CartPageLayoutProps) {
  return (
    <section className="container py-8 sm:py-10 lg:py-12">
      {header}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left column — cart items + coupon */}
        <div className="lg:col-span-2  flex flex-col gap-4">{cartItems}</div>

        {/* Right column — order summary (sticky on large screens) */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">{summary}</div>
        </div>
      </div>
    </section>
  );
}
