
import { Property, PropertyFilter } from '@/types/property';

export interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  loading: boolean;
  activeProperty: Property | null;
  filter: PropertyFilter;
  favorites: string[]; // Array of favorite property IDs
  setFilter: (filter: PropertyFilter) => void;
  getPropertyById: (id: string) => Property | undefined;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProperty: (id: string, updatedFields: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  setActiveProperty: (property: Property | null) => void;
  addToFavorites: (propertyId: string) => Promise<void>;
  removeFromFavorites: (propertyId: string) => Promise<void>;
  isPropertyFavorite: (propertyId: string) => boolean;
}
