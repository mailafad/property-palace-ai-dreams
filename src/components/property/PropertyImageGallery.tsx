
import { Property } from '@/types/property';

interface PropertyImageGalleryProps {
  property: Property;
}

const PropertyImageGallery = ({ property }: PropertyImageGalleryProps) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 rounded-lg overflow-hidden">
        <div className="aspect-[16/9] overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          {property.images.slice(1, 3).map((image, index) => (
            <div key={index} className="aspect-[4/3] overflow-hidden">
              <img 
                src={image} 
                alt={`${property.title} ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyImageGallery;
