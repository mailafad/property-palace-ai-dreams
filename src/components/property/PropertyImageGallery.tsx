
import { Property } from '@/types/property';

interface PropertyImageGalleryProps {
  property: Property;
}

import { useState } from 'react';

const PropertyImageGallery = ({ property }: PropertyImageGalleryProps) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = property.images || [];
  const maxThumbs = 3;
  const extraCount = images.length - maxThumbs;

  const openOverlay = (idx: number) => {
    setActiveIndex(idx);
    setShowOverlay(true);
  };

  const closeOverlay = () => setShowOverlay(false);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 rounded-lg overflow-hidden">
        <div className="aspect-[16/9] overflow-hidden relative cursor-pointer" onClick={() => openOverlay(0)}>
          <HeroImageWithSkeleton src={images[0]} alt={property.title} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          {images.slice(1, maxThumbs).map((image, index) => {
            const imgIdx = index + 1;
            const isLastThumb = imgIdx === maxThumbs - 1 && extraCount > 0;
            return (
              <div
                key={imgIdx}
                className="aspect-[4/3] overflow-hidden relative cursor-pointer"
                onClick={() => openOverlay(imgIdx)}
              >
                <img
                  src={image}
                  alt={`${property.title} ${imgIdx}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {isLastThumb && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-2xl font-bold">
                    +{extraCount}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlay */}
      {showOverlay && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center"
          onClick={closeOverlay}
        >
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold z-50"
            onClick={closeOverlay}
            aria-label="Close"
          >
            &times;
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl z-50 px-2"
            onClick={prevImage}
            aria-label="Previous image"
          >
            &#8592;
          </button>
          <img
            src={images[activeIndex]}
            alt={`Property image ${activeIndex + 1}`}
            className="max-h-[80vh] max-w-[90vw] rounded shadow-lg object-contain"
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-50 px-2"
            onClick={nextImage}
            aria-label="Next image"
          >
            &#8594;
          </button>
          <div className="mt-4 flex gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`h-3 w-3 rounded-full ${idx === activeIndex ? 'bg-white' : 'bg-gray-500'}`}
                onClick={e => { e.stopPropagation(); setActiveIndex(idx); }}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HeroImageWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover hover:scale-105 transition-transform duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        style={{ transition: 'opacity 0.3s' }}
      />
    </>
  );
};

export default PropertyImageGallery;
