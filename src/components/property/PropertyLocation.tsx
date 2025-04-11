
import { Property } from '@/types/property';
import { MapPin } from 'lucide-react';

interface PropertyLocationProps {
  property: Property;
}

const PropertyLocation = ({ property }: PropertyLocationProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4">Location</h2>
      
      <div className="flex items-center mb-4">
        <MapPin className="h-5 w-5 mr-2 text-primary" />
        <p>{property.address}, {property.city}, {property.state} {property.zipCode}</p>
      </div>
      
      <div className="aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center mb-4">
        <div className="text-center p-4">
          <MapPin className="h-8 w-8 mb-2 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Map view would be displayed here</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Neighborhood</h3>
        <p className="text-muted-foreground">
          This property is located in a desirable neighborhood with easy access to shopping, dining,
          and entertainment options. The area offers excellent schools and convenient transportation links.
        </p>
      </div>
    </div>
  );
};

export default PropertyLocation;
