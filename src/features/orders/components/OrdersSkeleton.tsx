/* ═══════════════════════════════════════════════════════════════════════════
   OrdersSkeleton
   Pulse-animated placeholder matching the OrderCard layout.
   ═══════════════════════════════════════════════════════════════════════════ */

function Pulse({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-neutral-200 ${className}`} />;
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <div className="space-y-1.5">
          <Pulse className="h-4 w-28" />
          <Pulse className="h-3 w-20" />
        </div>
        <Pulse className="h-6 w-20 rounded-full" />
      </div>

      {/* Body */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Pulse key={i} className="w-10 h-10 rounded-lg border-2 border-white" />
            ))}
          </div>
          <Pulse className="h-3 w-12 ml-1" />
        </div>
        <div className="space-y-1.5 flex flex-col items-end">
          <Pulse className="h-4 w-24" />
          <Pulse className="h-3 w-16" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 px-5 py-3 border-t border-neutral-100">
        <Pulse className="h-7 w-24 rounded-md" />
        <Pulse className="h-7 w-24 rounded-md" />
      </div>
    </div>
  );
}

export default function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
