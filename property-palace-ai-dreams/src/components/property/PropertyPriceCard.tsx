
import { Property } from '@/types/property';
import { formatCurrency } from '@/lib/utils';
import { Bed, Bath, Square, IndianRupee } from 'lucide-react';

interface PropertyPriceCardProps {
  property: Property;
}

const PropertyPriceCard = ({ property }: PropertyPriceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-muted-foreground text-sm">Price</p>
          <p className="text-2xl md:text-3xl font-bold text-black flex items-center">
            <IndianRupee className="h-5 w-5 mr-1 text-black" />
            {new Intl.NumberFormat('en-IN').format(property.price)}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <div className="flex items-center">
            <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-lg font-semibold">{property.bedrooms}</p>
              <p className="text-xs text-muted-foreground">Bedrooms</p>
            </div>
          </div>
          <div className="flex items-center">
            <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-lg font-semibold">{property.bathrooms}</p>
              <p className="text-xs text-muted-foreground">Bathrooms</p>
            </div>
          </div>
          <div className="flex items-center">
            <Square className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-lg font-semibold">{property.area}</p>
              <p className="text-xs text-muted-foreground">Sq Ft</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPriceCard;
