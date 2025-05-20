import { Property } from '@/types/property';
import { formatPropertyType } from '@/utils/propertyTypeUtils';
import { Badge } from '@/components/ui/badge';

interface PropertyDescriptionProps {
  property: Property;
}

const PropertyDescription = ({ property }: PropertyDescriptionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4">About This Property</h2>
      <div className="prose max-w-none">
        <div className="mb-4">
          <Badge variant="secondary" className="mb-2">
            {formatPropertyType(property)}
          </Badge>
          <p className="mt-4">{property.description}</p>
        </div>
        
        {property.aiDescription && (
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-medium mb-2">Property Highlights</h3>
            <p className="text-muted-foreground">{property.aiDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDescription;
