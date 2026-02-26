export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero skeleton */}
      <div className="bg-linear-to-r from-green-700 via-green-600 to-emerald-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center gap-4">
          <div className="h-7 w-48 bg-white/20 rounded-full animate-pulse" />
          <div className="h-12 w-72 bg-white/20 rounded-xl animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-white/20 rounded-lg animate-pulse" />
          <div className="flex gap-6 mt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 w-32 bg-white/15 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between mb-8">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-9 w-44 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="aspect-square bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
                <div className="flex justify-between items-end pt-1">
                  <div className="space-y-1.5">
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-14 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-9 w-20 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
