export default function BrandsSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <div className="aspect-square bg-gray-200 animate-pulse"></div>
            <div className="p-4 border-t border-gray-100">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
