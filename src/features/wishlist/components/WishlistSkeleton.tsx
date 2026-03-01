export default function WishlistSkeleton() {
  return (
    <div className="container py-8 sm:py-10 lg:py-12">
      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
          >
            {/* Image Skeleton */}
            <div className="aspect-square bg-gray-200 animate-pulse" />

            {/* Content Skeleton */}
            <div className="p-4">
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-3" />
              <div className="flex items-center justify-between gap-2">
                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-9 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
