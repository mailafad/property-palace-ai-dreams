
import { Property } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Heart, Share } from 'lucide-react';

interface PropertyDetailHeaderProps {
  property: Property;
}

const PropertyDetailHeader = ({ property }: PropertyDetailHeaderProps) => {
  const statusColors = {
    'for-sale': 'bg-green-500',
    'for-rent': 'bg-blue-500',
    'sold': 'bg-red-500',
    'pending': 'bg-yellow-500'
  };
  
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="secondary" className={`${statusColors[property.status]} text-white`}>
            {property.status.replace('-', ' ')}
          </Badge>
          {property.featured && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Featured
            </Badge>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
        <div className="flex items-center text-muted-foreground mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <p>{property.address}, {property.city}, {property.state} {property.zipCode}</p>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4 md:mt-0">
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Share className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PropertyDetailHeader;
