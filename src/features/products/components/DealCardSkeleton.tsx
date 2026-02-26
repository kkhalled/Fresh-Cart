export default function DealCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="aspect-square bg-gray-200 animate-pulse" />
      <div className="p-3 space-y-3">
        <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 bg-gray-200 rounded animate-pulse" />
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
  );
}
