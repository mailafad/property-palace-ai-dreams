
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, PropertyFilter } from '@/types/property';
import { PropertyContextType } from './types';
import { fetchProperties, addPropertyToDb, updatePropertyInDb, deletePropertyFromDb } from './propertyApi';
import { applyFilters } from './filterUtils';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [filter, setFilter] = useState<PropertyFilter>({});
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const queryClient = useQueryClient();

  // Fetch properties with React Query
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties
  });

  // Add property mutation
  const addPropertyMutation = useMutation({
    mutationFn: addPropertyToDb,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property added successfully');
    }
  });

  // Update property mutation
  const updatePropertyMutation = useMutation({
    mutationFn: async ({ id, updatedFields }: { id: string, updatedFields: Partial<Property> }) => {
      await updatePropertyInDb(id, updatedFields);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property updated successfully');
    }
  });

  // Delete property mutation
  const deletePropertyMutation = useMutation({
    mutationFn: deletePropertyFromDb,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property deleted successfully');
    }
  });

  // Apply filters
  useEffect(() => {
    const filtered = applyFilters(properties, filter);
    setFilteredProperties(filtered);
  }, [filter, properties]);

  const getPropertyById = (id: string): Property | undefined => {
    return properties.find(property => property.id === id);
  };

  const addProperty = async (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    await addPropertyMutation.mutateAsync(property);
  };

  const updateProperty = async (id: string, updatedFields: Partial<Property>) => {
    await updatePropertyMutation.mutateAsync({ id, updatedFields });
  };

  const deleteProperty = async (id: string) => {
    await deletePropertyMutation.mutateAsync(id);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties: properties || [],
        filteredProperties,
        loading: isLoading,
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
