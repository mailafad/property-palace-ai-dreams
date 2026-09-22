import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Property } from '@/types/property';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { formatPropertyPrice } from '@/lib/utils';

const getYouTubeVideoId = (url?: string) => {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === 'youtu.be') return parsedUrl.pathname.slice(1).split('/')[0] || null;
    if (parsedUrl.hostname.includes('youtube.com')) {
      return parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').filter(Boolean).pop() || null;
    }
  } catch {
    return null;
  }

  return null;
};

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { id, title, price, address, city, state, images, status, youtubeLink } = property;
  const { addToFavorites, removeFromFavorites, isPropertyFavorite } = useProperty();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const isFavorite = isPropertyFavorite(id);
  const youtubeVideoId = getYouTubeVideoId(youtubeLink);
  const cardUrl = youtubeLink || `/property/${id}`;
  
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
    <a
      href={cardUrl}
      target={youtubeLink ? '_blank' : undefined}
      rel={youtubeLink ? 'noreferrer' : undefined}
      className="group"
    >
      <div className="property-card">
        <div className="relative aspect-video">
          <img
            src={youtubeVideoId ? `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg` : (images[0] || '/placeholder.svg')}
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
            <span className="text-lg font-bold text-black mb-4">{formatPropertyPrice(price, property.priceUnit)}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default PropertyCard;
