
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
    // Helper to fetch coordinates from Nominatim
    const fetchCoordinates = async (query: string) => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
          return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        }
      } catch (e) {
        console.error('Geocoding failed:', e);
      }
      // Default to Chennai if not found
      return [13.0827, 80.2707];
    };

    const initializeMap = async () => {
      if (!mapRef.current || typeof window === 'undefined') return;

      try {
        const L = (window as any).L;
        if (!L) {
          console.error('Leaflet library not loaded');
          return;
        }

        // Build query from property area/city/state
        const query = [property.address, property.city, property.state].filter(Boolean).join(', ');
        const propertyLatLng = await fetchCoordinates(query);

        // Initialize the map centered on the area
        const map = L.map(mapRef.current).setView(propertyLatLng, 13);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Do NOT add a marker

        // Fetch real nearby amenities using Overpass API
        const overpassQuery = `[out:json][timeout:25];
          (
            node["amenity"](around:1000,${propertyLatLng[0]},${propertyLatLng[1]});
            way["amenity"](around:1000,${propertyLatLng[0]},${propertyLatLng[1]});
            relation["amenity"](around:1000,${propertyLatLng[0]},${propertyLatLng[1]});
          );
          out center;`;

        const overpassUrl = "https://overpass-api.de/api/interpreter";
        let realHotspots: Hotspot[] = [];
        try {
          const response = await fetch(overpassUrl, {
            method: "POST",
            body: overpassQuery,
            headers: { "Content-Type": "text/plain" }
          });
          const data = await response.json();
          if (data && data.elements) {
            // Map amenity types to icons
            const iconMap: Record<string, React.ReactNode> = {
              restaurant: <Utensils className="h-4 w-4" />,
              cafe: <Coffee className="h-4 w-4" />,
              school: <School className="h-4 w-4" />,
              hospital: <Ambulance className="h-4 w-4" />,
              bus_station: <Bus className="h-4 w-4" />,
              college: <School className="h-4 w-4" />,
              university: <School className="h-4 w-4" />,
              shopping_mall: <ShoppingBag className="h-4 w-4" />,
              supermarket: <ShoppingBag className="h-4 w-4" />,
              // Add more mappings as needed
            };
            realHotspots = data.elements
              .filter((el: any) => el.tags && el.tags.amenity && el.tags.name)
              .slice(0, 10) // Limit to 10 for performance
              .map((el: any) => {
                // Calculate distance (rough, haversine formula)
                const R = 6371; // km
                const dLat = ((el.lat - propertyLatLng[0]) * Math.PI) / 180;
                const dLon = ((el.lon - propertyLatLng[1]) * Math.PI) / 180;
                const a =
                  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos((propertyLatLng[0] * Math.PI) / 180) *
                    Math.cos((el.lat * Math.PI) / 180) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const d = R * c;
                return {
                  type: el.tags.amenity,
                  name: el.tags.name,
                  distance: `${d.toFixed(2)} km`,
                  icon: iconMap[el.tags.amenity] || <Building className="h-4 w-4" />,
                };
              });
          }
        } catch (err) {
          console.error("Overpass API error:", err);
        }

        setHotspots(realHotspots);
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
