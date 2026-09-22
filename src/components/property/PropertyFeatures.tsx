
import { Property } from '@/types/property';
import { formatPropertyType } from '@/utils/propertyTypeUtils';

interface PropertyFeaturesProps {
  property: Property;
}

const PropertyFeatures = ({ property }: PropertyFeaturesProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4">Property Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Basic Information</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Property Code</span>
              <span className="font-mono font-medium">{property.propertyCode ? property.propertyCode.toUpperCase() : '-'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Property Type</span>
              <span className="font-medium capitalize">{formatPropertyType(property)}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Year Built</span>
              <span className="font-medium">{property.yearBuilt}</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Additional Features</h3>
          <ul className="space-y-2">
            {property.features.map((feature, index) => (
              <li key={index} className="flex justify-between">
                <span className="text-muted-foreground">{feature.name}</span>
                <span className="font-medium">
                  {typeof feature.value === 'boolean' 
                    ? (feature.value ? 'Yes' : 'No') 
                    : feature.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyFeatures;
