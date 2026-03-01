/* ═══════════════════════════════════════════════════════════════════════════
   CartSkeleton — Shimmer placeholder shown while the cart is being fetched.
   Mimics the exact layout of CartPageLayout + CartItemCard + OrderSummary.
   ═══════════════════════════════════════════════════════════════════════════ */

function SkeletonPulse({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      aria-hidden="true"
    />
  );
}

function SkeletonCartItem() {
  return (
    <div className="flex gap-4 py-5">
      {/* Image */}
      <SkeletonPulse className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl" />

      {/* Details */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            <SkeletonPulse className="h-4 w-3/4" />
            <SkeletonPulse className="h-3 w-1/3" />
          </div>
          <SkeletonPulse className="w-8 h-8 rounded-full" />
        </div>

        {/* Rating */}
        <SkeletonPulse className="h-3 w-24" />

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <SkeletonPulse className="h-8 w-24 rounded-full" />
          <SkeletonPulse className="h-5 w-16" />
        </div>
      </div>
    </div>
  );
}

function SkeletonSummary() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col gap-4">
      <SkeletonPulse className="h-5 w-32" />

      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between">
            <SkeletonPulse className="h-4 w-24" />
            <SkeletonPulse className="h-4 w-16" />
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 flex justify-between">
        <SkeletonPulse className="h-5 w-12" />
        <SkeletonPulse className="h-6 w-20" />
      </div>

      <SkeletonPulse className="h-12 w-full rounded-xl" />
      <SkeletonPulse className="h-11 w-full rounded-xl" />
    </div>
  );
}

export default function CartSkeleton() {
  return (
    <section className="container py-8 sm:py-10 lg:py-12">
      {/* Header skeleton */}
      <div className="mb-6 space-y-2">
        <SkeletonPulse className="h-7 w-48" />
        <SkeletonPulse className="h-4 w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left column — item list */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-8 sm:px-6 divide-y divide-gray-100">
            {[1, 2, 3].map((i) => (
              <SkeletonCartItem key={i} />
            ))}
          </div>
        </div>

        {/* Right column — summary */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <SkeletonSummary />
          </div>
        </div>
      </div>
    </section>
  );
}
