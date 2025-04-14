
import { useEffect, useRef, useState } from 'react';
import { Property } from '@/types/property';
import { MapPin, Navigation, Coffee, ShoppingBag, School, Utensils, Ambulance, Building, Bus } from 'lucide-react';

interface PropertyLocationProps {
  property: Property;
}

interface Hotspot {
  type: string;
  name: string;
  distance: string;
  icon: React.ReactNode;
}

const PropertyLocation = ({ property }: PropertyLocationProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  
  useEffect(() => {
    // Load the Google Maps script dynamically
    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.onload = initializeMap;
      document.body.appendChild(googleMapsScript);
    };
    
    // Initialize map
    const initializeMap = () => {
      if (!mapRef.current) return;
      
      // Dummy coordinates - in a real app, you'd get these from the property
      const propertyLatLng = { lat: 13.0827, lng: 80.2707 }; // Chennai coordinates
      
      const map = new google.maps.Map(mapRef.current, {
        center: propertyLatLng,
        zoom: 15,
        mapTypeControl: false,
      });
      
      // Add property marker
      new google.maps.Marker({
        position: propertyLatLng,
        map,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        },
        title: property.title,
      });
      
      // In a real implementation, you would use the Places API to find nearby amenities
      // For now, we'll use mock data
      const mockHotspots: Hotspot[] = [
        { type: 'restaurant', name: 'Saravana Bhavan', distance: '0.3 km', icon: <Utensils className="h-4 w-4" /> },
        { type: 'school', name: 'Chennai Public School', distance: '0.8 km', icon: <School className="h-4 w-4" /> },
        { type: 'shopping', name: 'Phoenix Marketcity', distance: '1.2 km', icon: <ShoppingBag className="h-4 w-4" /> },
        { type: 'hospital', name: 'Apollo Hospital', distance: '1.5 km', icon: <Ambulance className="h-4 w-4" /> },
        { type: 'bus', name: 'Anna Nagar Bus Terminal', distance: '0.6 km', icon: <Bus className="h-4 w-4" /> },
        { type: 'cafe', name: 'Cafe Coffee Day', distance: '0.4 km', icon: <Coffee className="h-4 w-4" /> },
      ];
      
      setHotspots(mockHotspots);
      setIsMapLoaded(true);
    };
    
    // For demonstration, we'll simulate the map loading
    // In production, you would use the actual Google Maps API
    setTimeout(() => {
      setIsMapLoaded(true);
      // Mock hotspots data
      const mockHotspots: Hotspot[] = [
        { type: 'restaurant', name: 'Saravana Bhavan', distance: '0.3 km', icon: <Utensils className="h-4 w-4" /> },
        { type: 'school', name: 'Chennai Public School', distance: '0.8 km', icon: <School className="h-4 w-4" /> },
        { type: 'shopping', name: 'Phoenix Marketcity', distance: '1.2 km', icon: <ShoppingBag className="h-4 w-4" /> },
        { type: 'hospital', name: 'Apollo Hospital', distance: '1.5 km', icon: <Ambulance className="h-4 w-4" /> },
        { type: 'bus', name: 'Anna Nagar Bus Terminal', distance: '0.6 km', icon: <Bus className="h-4 w-4" /> },
        { type: 'cafe', name: 'Cafe Coffee Day', distance: '0.4 km', icon: <Coffee className="h-4 w-4" /> },
      ];
      setHotspots(mockHotspots);
    }, 1000);
    
    // Uncomment this to use the actual Google Maps API
    // loadGoogleMapsScript();
    
  }, [property]);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4">Location</h2>
      
      <div className="flex items-center mb-4">
        <MapPin className="h-5 w-5 mr-2 text-primary" />
        <p>{property.address}, {property.city}, {property.state} {property.zipCode}</p>
      </div>
      
      <div 
        ref={mapRef} 
        className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6 overflow-hidden"
      >
        {!isMapLoaded ? (
          <div className="text-center p-4">
            <MapPin className="h-8 w-8 mb-2 mx-auto text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        ) : (
          <iframe 
            title="Property Location"
            width="100%" 
            height="100%" 
            style={{border: 0}}
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
              `${property.address}, ${property.city}, ${property.state}`
            )}`}
          ></iframe>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Neighborhood</h3>
        <p className="text-muted-foreground mb-4">
          This property is located in a desirable neighborhood with excellent access to amenities.
        </p>
        
        {hotspots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {hotspots.map((hotspot, index) => (
              <div key={index} className="flex items-center border rounded-md p-2">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  {hotspot.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{hotspot.name}</p>
                  <p className="text-xs text-muted-foreground">{hotspot.distance}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyLocation;
