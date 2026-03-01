/* ═══════════════════════════════════════════════════════════════════════════
   CategorySkeleton
   Skeleton loader for category page with hero + subcategories grid.
   ═══════════════════════════════════════════════════════════════════════════ */

function Pulse({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-neutral-200 ${className}`} />;
}

export default function CategorySkeleton() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero skeleton */}
      <div className="relative h-64 bg-neutral-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <Pulse className="h-10 w-48" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <Pulse className="h-6 w-32 mb-8" />

        {/* Subcategories grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-neutral-200 p-6"
            >
              <div className="flex items-center justify-center mb-3">
                <Pulse className="w-16 h-16 rounded-full" />
              </div>
              <Pulse className="h-4 w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
