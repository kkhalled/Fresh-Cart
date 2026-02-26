export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button Skeleton */}
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>

      {/* Brand Header Skeleton */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-48 h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto md:mx-0"></div>
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mx-auto md:mx-0"></div>
          </div>
        </div>
      </div>

      {/* Section Title Skeleton */}
      <div className="mb-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-1 w-20 bg-gray-200 rounded"></div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100">
            <div className="aspect-square bg-gray-200 animate-pulse"></div>
            <div className="p-3 space-y-2">
              <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
