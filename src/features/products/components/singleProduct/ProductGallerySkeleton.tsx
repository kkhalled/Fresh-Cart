export default function ProductGallerySkeleton() {
  return (
    <div className="product-gallery">
      <div className="rounded-xl overflow-hidden shadow-md bg-white">
        {/* Main Image Skeleton */}
        <div className="relative w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 opacity-40">
              <svg 
                className="w-20 h-20" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Thumbnails Skeleton */}
        <div className="flex gap-2 p-2 bg-white">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="w-1/4 aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"
              style={{ animationDelay: `${item * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
