
import { Property, PropertyFilter } from '@/types/property';

export interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  loading: boolean;
  activeProperty: Property | null;
  filter: PropertyFilter;
  setFilter: (filter: PropertyFilter) => void;
  getPropertyById: (id: string) => Property | undefined;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  setActiveProperty: (property: Property | null) => void;
}
