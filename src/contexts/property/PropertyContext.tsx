
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, PropertyFilter } from '@/types/property';
import { PropertyContextType } from './types';
import { fetchProperties, addPropertyToDb, updatePropertyInDb, deletePropertyFromDb } from './propertyApi';
import { applyFilters } from './filterUtils';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [filter, setFilter] = useState<PropertyFilter>({});
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch properties with React Query
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties
  });

  // Fetch user favorites from Supabase
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('property_id')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching favorites:', error);
          return;
        }

        if (data) {
          const favoriteIds = data.map(item => item.property_id);
          setFavorites(favoriteIds);
        }
      } catch (error) {
        console.error('Error in fetching favorites:', error);
      }
    };

    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

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

  // Add to favorites mutation
  const addToFavoritesMutation = useMutation({
    mutationFn: async (propertyId: string) => {
      if (!user) {
        throw new Error('You must be logged in to add favorites');
      }
      
      const { error } = await supabase
        .from('favorites')
        .insert({ 
          user_id: user.id, 
          property_id: propertyId 
        });
        
      if (error) throw error;
      return propertyId;
    },
    onSuccess: (propertyId) => {
      setFavorites(prev => [...prev, propertyId]);
      toast.success('Added to favorites');
    },
    onError: (error) => {
      console.error('Error adding to favorites:', error);
      toast.error('Failed to add to favorites');
    }
  });

  // Remove from favorites mutation
  const removeFromFavoritesMutation = useMutation({
    mutationFn: async (propertyId: string) => {
      if (!user) {
        throw new Error('You must be logged in to remove favorites');
      }
      
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('property_id', propertyId);
        
      if (error) throw error;
      return propertyId;
    },
    onSuccess: (propertyId) => {
      setFavorites(prev => prev.filter(id => id !== propertyId));
      toast.success('Removed from favorites');
    },
    onError: (error) => {
      console.error('Error removing from favorites:', error);
      toast.error('Failed to remove from favorites');
    }
  });

  // Apply filters
  useEffect(() => {
    let filtered = applyFilters(properties, filter);
    
    // If on favorites page, filter by favorites
    if (window.location.pathname === '/favorites' && user) {
      filtered = filtered.filter(property => favorites.includes(property.id));
    }
    
    setFilteredProperties(filtered);
  }, [filter, properties, favorites, user, window.location.pathname]);

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

  const addToFavorites = async (propertyId: string) => {
    await addToFavoritesMutation.mutateAsync(propertyId);
  };

  const removeFromFavorites = async (propertyId: string) => {
    await removeFromFavoritesMutation.mutateAsync(propertyId);
  };

  const isPropertyFavorite = (propertyId: string) => {
    return favorites.includes(propertyId);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties: properties || [],
        filteredProperties,
        loading: isLoading,
        activeProperty,
        filter,
        favorites,
        setFilter,
        getPropertyById,
        addProperty,
        updateProperty,
        deleteProperty,
        setActiveProperty,
        addToFavorites,
        removeFromFavorites,
        isPropertyFavorite,
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
