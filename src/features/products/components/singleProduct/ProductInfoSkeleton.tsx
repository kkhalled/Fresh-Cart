export default function ProductInfoSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Stock Badge and Icons Row Skeleton */}
      <div className="mb-4 flex items-center justify-between">
        <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
          <div className="h-5 w-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
        </div>
      </div>

      {/* Product Title Skeleton */}
      <div className="mb-4 space-y-2">
        <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-3/4"></div>
        <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-1/2"></div>
      </div>

      {/* Brand, Category & Subcategory Skeleton */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="h-5 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
        <div className="h-5 w-1 bg-gray-200"></div>
        <div className="h-5 w-36 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
        <div className="h-5 w-1 bg-gray-200"></div>
        <div className="h-5 w-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
      </div>

      {/* Rating Skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
          ))}
        </div>
        <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
      </div>

      {/* Price Section Skeleton */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-7 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
          <div className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
          <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
          <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
        </div>
        
        {/* Total Price Card Skeleton */}
        <div className="rounded-lg border-2 border-gray-200 p-4 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 bg-[length:200%_100%] animate-shimmer">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded mb-2"></div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
                <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-3 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded mb-2 ml-auto"></div>
              <div className="h-8 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded ml-auto"></div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="h-4 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200"></div>

      {/* Description Skeleton */}
      <div className="mb-6 space-y-2">
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-full"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-full"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-3/4"></div>
      </div>

      {/* Availability Skeleton */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="h-5 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
          <div className="h-5 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
        </div>
      </div>

      {/* Quantity Selector Skeleton */}
      <div className="mb-6">
        <div className="h-5 w-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded mb-3"></div>
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center rounded-lg border-2 border-gray-200 bg-white overflow-hidden">
            <div className="h-12 w-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
            <div className="h-12 w-16 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer border-x-2 border-gray-200"></div>
            <div className="h-12 w-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg"></div>
        <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg"></div>
      </div>

      {/* Bottom Info Boxes Skeleton */}
      <div className="space-y-3">
        <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
          <div className="h-10 w-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
            <div className="h-3 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
          <div className="h-10 w-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
            <div className="h-3 w-56 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
