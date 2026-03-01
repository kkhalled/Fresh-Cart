interface WishlistHeaderProps {
  itemCount: number;
}

export default function WishlistHeader({ itemCount }: WishlistHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        My Wishlist
      </h1>
      {itemCount > 0 ? (
        <p className="mt-1 text-sm text-gray-500">
          {itemCount} {itemCount === 1 ? "item" : "items"} saved
        </p>
      ) : (
        <p className="mt-1 text-sm text-gray-500">No items saved yet</p>
      )}
    </div>
  );
}
