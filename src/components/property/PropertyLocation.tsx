
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
    // Function to initialize the OpenStreetMap
    const initializeMap = () => {
      if (!mapRef.current || typeof window === 'undefined') return;
      
      try {
        // Create a variable to hold OSM libraries
        const L = (window as any).L;
        
        if (!L) {
          console.error('Leaflet library not loaded');
          return;
        }
        
        // Chennai coordinates (default) - in a real app, get from property
        const propertyLatLng = [13.0827, 80.2707]; 
        
        // Initialize the map
        const map = L.map(mapRef.current).setView(propertyLatLng, 15);
        
        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add property marker
        L.marker(propertyLatLng).addTo(map)
          .bindPopup(`<b>${property.title}</b><br>${property.address}`);
        
        // Mock nearby places - in a real app, you would use the Overpass API or similar
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
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };
    
    // Load Leaflet dynamically if it's not already loaded
    if (!(window as any).L) {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(linkElement);
      
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      scriptElement.onload = initializeMap;
      document.head.appendChild(scriptElement);
    } else {
      initializeMap();
    }
    
    return () => {
      // Clean up
      if ((window as any).L && mapRef.current) {
        const L = (window as any).L;
        if (L.map) {
          const map = L.map(mapRef.current);
          if (map) map.remove();
        }
      }
    };
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
        style={{ minHeight: '300px' }}
      >
        {!isMapLoaded && (
          <div className="text-center p-4">
            <MapPin className="h-8 w-8 mb-2 mx-auto text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
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
