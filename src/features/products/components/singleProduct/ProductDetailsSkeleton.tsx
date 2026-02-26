import ProductGallerySkeleton from "./ProductGallerySkeleton";
import ProductInfoSkeleton from "./ProductInfoSkeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Left Section - Gallery Skeleton (35%) */}
          <div className="lg:w-[35%]">
            <ProductGallerySkeleton />
          </div>

          {/* Right Section - Product Info Skeleton (65%) */}
          <div className="lg:w-[65%]">
            <ProductInfoSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
