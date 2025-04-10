
import { Property } from '@/types/property';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const statusColors = {
    'for-sale': 'bg-green-500',
    'for-rent': 'bg-blue-500',
    'sold': 'bg-red-500',
    'pending': 'bg-yellow-500'
  };

  return (
    <Link to={`/property/${property.id}`}>
      <Card className="property-card h-full hover:scale-[1.02] transition-all">
        <div className="relative overflow-hidden h-48 w-full">
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="h-full w-full object-cover" 
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className={`${statusColors[property.status]} text-white`}>
              {property.status.replace('-', ' ')}
            </Badge>
          </div>
          {property.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-primary text-white">
                Featured
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="pt-4">
          <h3 className="font-bold text-lg line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <p className="text-sm line-clamp-1">{property.address}, {property.city}, {property.state}</p>
          </div>
          <p className="font-bold text-lg text-primary mt-2">
            {formatCurrency(property.price)}
          </p>
          <div className="flex justify-between mt-3">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm">{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm">{property.bathrooms} baths</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm">{property.area} sqft</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3 text-sm text-muted-foreground">
          <div className="flex items-center">
            {property.realtor.photo ? (
              <img 
                src={property.realtor.photo} 
                alt={property.realtor.name}
                className="h-6 w-6 rounded-full mr-2 object-cover"
              />
            ) : null}
            <span>{property.realtor.name}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
