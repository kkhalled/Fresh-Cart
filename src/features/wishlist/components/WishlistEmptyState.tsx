import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export default function WishlistEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <FontAwesomeIcon
          icon={faHeart}
          className="w-12 h-12 text-gray-400"
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Your wishlist is empty
      </h2>

      <p className="text-gray-600 text-center max-w-md mb-8">
        Save items you love by clicking the heart icon on products. You can
        always come back to them later!
      </p>

      <Link
        href="/products"
        className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors duration-150"
      >
        Start Shopping
      </Link>
    </div>
  );
}
