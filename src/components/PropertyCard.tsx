
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Property } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { id, title, price, address, city, state, bedrooms, bathrooms, area, images, status } = property;
  const { addToFavorites, removeFromFavorites, isPropertyFavorite } = useProperty();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const isFavorite = isPropertyFavorite(id);
  
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please sign in to save properties');
      return;
    }
    
    setIsLoading(true);
    try {
      if (isFavorite) {
        await removeFromFavorites(id);
      } else {
        await addToFavorites(id);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Link to={`/property/${id}`} className="group">
      <div className="property-card overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
        <div className="relative">
          <img
            src={images[0] || '/placeholder.svg'}
            alt={title}
            className="h-48 w-full object-cover"
          />
          <button
            onClick={handleFavoriteClick}
            disabled={isLoading}
            className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 text-gray-700 backdrop-blur-sm transition-colors hover:bg-white hover:text-primary"
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
            />
          </button>
          <div className="absolute bottom-2 left-2">
            <Badge variant={status === 'for-sale' ? 'default' : 'secondary'}>
              {status === 'for-sale' ? 'For Sale' : status === 'for-rent' ? 'For Rent' : status === 'sold' ? 'Sold' : 'Pending'}
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-card-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{address}, {city}, {state}</p>
          <p className="my-2 text-lg font-bold">₹{price.toLocaleString('en-IN')}</p>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{bedrooms} Beds</span>
            <span>{bathrooms} Baths</span>
            <span>{area.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
