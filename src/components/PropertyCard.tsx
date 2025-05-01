import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Property } from '@/types/property';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { formatPropertyType } from '@/utils/propertyTypeUtils';

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
  
  const getBadgeText = (status: string) => {
    switch (status) {
      case 'for-sale':
        return 'For Sale';
      case 'for-rent':
        return 'For Rent';
      case 'sold':
        return 'Sold';
      default:
        return 'Pending';
    }
  };
  
  return (
    <Link to={`/property/${id}`} className="group">
      <div className="property-card">
        <div className="relative h-48">
          <img
            src={images[0] || '/placeholder.svg'}
            alt={title}
            className="h-full w-full object-cover"
          />
          <button
            onClick={handleFavoriteClick}
            disabled={isLoading}
            className="heart-button"
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-red-500'}`}
            />
          </button>
          <div className="absolute top-4 left-4">
            <span className="bg-[#a5ff03] text-black px-3 py-1 rounded-full text-sm font-bold">
              {getBadgeText(status)}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-black hover:text-[#a5ff03] transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 flex items-center">
            <i className="fas fa-map-marker-alt text-[#a5ff03] mr-2"></i>
            {address}, {city}, {state}
          </p>
          <div className="flex flex-col mb-4">
            <span className="text-lg font-bold text-black mb-4">₹{price.toLocaleString('en-IN')}</span>
            <div className="grid grid-cols-3 gap-4">
              <div className="feature-item">
                <i className="fas fa-bed text-gray-700 mb-1"></i>
                <span className="block">{bedrooms}</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-bath text-gray-700 mb-1"></i>
                <span className="block">{bathrooms}</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-vector-square text-gray-700 mb-1"></i>
                <span className="block">{area.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-black text-white py-2 rounded-md hover:bg-opacity-90 transition-all duration-300 hover:shadow-[0_0_15px_rgba(165,255,3,0.5)]">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
