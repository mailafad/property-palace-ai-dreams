
import { Property } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Heart, Share } from 'lucide-react';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useState } from 'react';

interface PropertyDetailHeaderProps {
  property: Property;
  onShare?: () => void;
}

const PropertyDetailHeader = ({ property, onShare }: PropertyDetailHeaderProps) => {
  const { addToFavorites, removeFromFavorites, isPropertyFavorite } = useProperty();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const isFavorite = isPropertyFavorite(property.id);
  
  const statusColors = {
    'for-sale': 'bg-green-500',
    'for-rent': 'bg-blue-500',
    'sold': 'bg-red-500',
    'pending': 'bg-yellow-500'
  };
  
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
        await removeFromFavorites(property.id);
        toast.success('Removed from favorites');
      } else {
        await addToFavorites(property.id);
        toast.success('Added to favorites');
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error('Could not update favorites');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="secondary" className={`bg-green-500 text-white px-4 py-1 rounded-full`}>
            {property.status.replace('-', ' ')}
          </Badge>
          {property.featured && (
            <Badge variant="outline" className="bg-green-500 text-white px-4 py-1 rounded-full">
              Featured
            </Badge>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          {property.title}
          {property.propertyCode && (
            <span className="text-base font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded ml-2">
              {property.propertyCode.toUpperCase()}
            </span>
          )}
        </h1>
        <div className="flex items-center text-muted-foreground mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <p>{property.address}, {property.city}, {property.state} {property.zipCode}</p>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4 md:mt-0">
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleFavoriteClick}
          disabled={isLoading}
          className={isFavorite ? "text-red-500" : ""}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500' : ''}`} />
        </Button>
        <Button variant="outline" size="icon" onClick={onShare}>
          <Share className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PropertyDetailHeader;
