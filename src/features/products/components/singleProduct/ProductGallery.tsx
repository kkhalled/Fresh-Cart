"use client";

import dynamic from "next/dynamic";
import "react-image-gallery/styles/image-gallery.css";

const ImageGallery = dynamic(() => import("react-image-gallery"), {
  ssr: false,
  loading: () => (
    <div className="aspect-square bg-gray-100 animate-pulse rounded-xl" />
  ),
});

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  // Transform images array to react-image-gallery format
  const galleryImages = images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <div className="product-gallery">
      <ImageGallery
        items={galleryImages}
        showPlayButton={false}
        showFullscreenButton={false}
        showNav={false}
        thumbnailPosition="bottom"
        additionalClass="rounded-xl overflow-hidden shadow-md"
      />
    </div>
  );
}


