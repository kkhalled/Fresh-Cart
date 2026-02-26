"use client";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";

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


