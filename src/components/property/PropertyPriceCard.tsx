
import { Property } from '@/types/property';
import { formatPropertyPrice } from '@/lib/utils';
import { IndianRupee } from 'lucide-react';

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
            {formatPropertyPrice(property.price, property.priceUnit).replace(/^₹/, '')}
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default PropertyPriceCard;
