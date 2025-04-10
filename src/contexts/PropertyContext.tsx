import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, PropertyFilter } from '@/types/property';
import { properties as initialProperties } from '@/data/properties';
import { toast } from 'sonner';

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  loading: boolean;
  activeProperty: Property | null;
  filter: PropertyFilter;
  setFilter: (filter: PropertyFilter) => void;
  getPropertyById: (id: string) => Property | undefined;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  setActiveProperty: (property: Property | null) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(initialProperties);
  const [loading, setLoading] = useState(false);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [filter, setFilter] = useState<PropertyFilter>({});

  useEffect(() => {
    setLoading(true);
    
    const applyFilters = () => {
      let result = [...properties];
      
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        result = result.filter(property => 
          property.title.toLowerCase().includes(searchLower) || 
          property.address.toLowerCase().includes(searchLower) ||
          property.city.toLowerCase().includes(searchLower) ||
          property.state.toLowerCase().includes(searchLower) ||
          property.zipCode.includes(filter.search)
        );
      }
      
      if (filter.minPrice !== undefined) {
        result = result.filter(property => property.price >= (filter.minPrice || 0));
      }
      
      if (filter.maxPrice !== undefined) {
        result = result.filter(property => property.price <= (filter.maxPrice || Number.MAX_VALUE));
      }
      
      if (filter.bedrooms !== undefined) {
        result = result.filter(property => property.bedrooms >= (filter.bedrooms || 0));
      }
      
      if (filter.bathrooms !== undefined) {
        result = result.filter(property => property.bathrooms >= (filter.bathrooms || 0));
      }
      
      if (filter.propertyType) {
        result = result.filter(property => property.type === filter.propertyType);
      }
      
      if (filter.status) {
        result = result.filter(property => property.status === filter.status);
      }
      
      return result;
    };
    
    const filtered = applyFilters();
    setFilteredProperties(filtered);
    setLoading(false);
  }, [filter, properties]);

  const getPropertyById = (id: string) => {
    return properties.find(property => property.id === id);
  };

  const addProperty = (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProperty: Property = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setProperties(prev => [...prev, newProperty]);
    toast.success("Property added successfully");
  };

  const updateProperty = (id: string, updatedFields: Partial<Property>) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === id 
          ? { 
              ...property, 
              ...updatedFields, 
              updatedAt: new Date().toISOString() 
            } 
          : property
      )
    );
    toast.success("Property updated successfully");
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(property => property.id !== id));
    toast.success("Property deleted successfully");
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties,
        loading,
        activeProperty,
        filter,
        setFilter,
        getPropertyById,
        addProperty,
        updateProperty,
        deleteProperty,
        setActiveProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = (): PropertyContextType => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
