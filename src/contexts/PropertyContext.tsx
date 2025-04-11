
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, PropertyFilter } from '@/types/property';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  loading: boolean;
  activeProperty: Property | null;
  filter: PropertyFilter;
  setFilter: (filter: PropertyFilter) => void;
  getPropertyById: (id: string) => Promise<Property | undefined>;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  setActiveProperty: (property: Property | null) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [filter, setFilter] = useState<PropertyFilter>({});
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const queryClient = useQueryClient();

  // Fetch properties with React Query
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          realtors:realtor_id (
            id,
            name,
            phone,
            email,
            photo
          )
        `);
      
      if (error) {
        toast.error('Error loading properties');
        throw error;
      }
      
      return data.map(item => {
        const { realtors, ...property } = item;
        return {
          ...property,
          id: property.id,
          title: property.title,
          price: property.price,
          address: property.address,
          city: property.city,
          state: property.state,
          zipCode: property.zip_code,
          description: property.description,
          aiDescription: property.ai_description,
          type: property.type,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area: property.area,
          yearBuilt: property.year_built,
          features: property.features,
          images: property.images,
          featured: property.featured,
          status: property.status,
          createdAt: property.created_at,
          updatedAt: property.updated_at,
          realtor: realtors
        } as Property;
      });
    }
  });

  // Add property mutation
  const addPropertyMutation = useMutation({
    mutationFn: async (newProperty: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
      const { realtor, ...propertyData } = newProperty;
      
      const propertyToInsert = {
        title: propertyData.title,
        price: propertyData.price,
        address: propertyData.address,
        city: propertyData.city,
        state: propertyData.state,
        zip_code: propertyData.zipCode,
        description: propertyData.description,
        ai_description: propertyData.aiDescription,
        type: propertyData.type,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        area: propertyData.area,
        year_built: propertyData.yearBuilt,
        features: propertyData.features,
        images: propertyData.images,
        featured: propertyData.featured,
        status: propertyData.status,
        realtor_id: realtor?.id
      };
      
      const { data, error } = await supabase
        .from('properties')
        .insert(propertyToInsert)
        .select(`
          *,
          realtors:realtor_id (
            id,
            name,
            phone,
            email,
            photo
          )
        `)
        .single();
      
      if (error) {
        toast.error('Error adding property');
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property added successfully');
    }
  });

  // Update property mutation
  const updatePropertyMutation = useMutation({
    mutationFn: async ({ id, updatedFields }: { id: string, updatedFields: Partial<Property> }) => {
      const { realtor, ...propertyData } = updatedFields;
      
      const propertyToUpdate: any = {};
      
      if (propertyData.title !== undefined) propertyToUpdate.title = propertyData.title;
      if (propertyData.price !== undefined) propertyToUpdate.price = propertyData.price;
      if (propertyData.address !== undefined) propertyToUpdate.address = propertyData.address;
      if (propertyData.city !== undefined) propertyToUpdate.city = propertyData.city;
      if (propertyData.state !== undefined) propertyToUpdate.state = propertyData.state;
      if (propertyData.zipCode !== undefined) propertyToUpdate.zip_code = propertyData.zipCode;
      if (propertyData.description !== undefined) propertyToUpdate.description = propertyData.description;
      if (propertyData.aiDescription !== undefined) propertyToUpdate.ai_description = propertyData.aiDescription;
      if (propertyData.type !== undefined) propertyToUpdate.type = propertyData.type;
      if (propertyData.bedrooms !== undefined) propertyToUpdate.bedrooms = propertyData.bedrooms;
      if (propertyData.bathrooms !== undefined) propertyToUpdate.bathrooms = propertyData.bathrooms;
      if (propertyData.area !== undefined) propertyToUpdate.area = propertyData.area;
      if (propertyData.yearBuilt !== undefined) propertyToUpdate.year_built = propertyData.yearBuilt;
      if (propertyData.features !== undefined) propertyToUpdate.features = propertyData.features;
      if (propertyData.images !== undefined) propertyToUpdate.images = propertyData.images;
      if (propertyData.featured !== undefined) propertyToUpdate.featured = propertyData.featured;
      if (propertyData.status !== undefined) propertyToUpdate.status = propertyData.status;
      if (realtor?.id !== undefined) propertyToUpdate.realtor_id = realtor.id;
      
      propertyToUpdate.updated_at = new Date().toISOString();
      
      const { error } = await supabase
        .from('properties')
        .update(propertyToUpdate)
        .eq('id', id);
      
      if (error) {
        toast.error('Error updating property');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property updated successfully');
    }
  });

  // Delete property mutation
  const deletePropertyMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      
      if (error) {
        toast.error('Error deleting property');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property deleted successfully');
    }
  });

  // Apply filters
  useEffect(() => {
    if (!properties) return;
    
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
  }, [filter, properties]);

  const getPropertyById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          realtors:realtor_id (
            id,
            name,
            phone,
            email,
            photo
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (!data) return undefined;
      
      const { realtors, ...property } = data;
      
      return {
        ...property,
        id: property.id,
        title: property.title,
        price: property.price,
        address: property.address,
        city: property.city,
        state: property.state,
        zipCode: property.zip_code,
        description: property.description,
        aiDescription: property.ai_description,
        type: property.type,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        yearBuilt: property.year_built,
        features: property.features,
        images: property.images,
        featured: property.featured,
        status: property.status,
        createdAt: property.created_at,
        updatedAt: property.updated_at,
        realtor: realtors
      } as Property;
    } catch (error) {
      console.error('Error fetching property:', error);
      return undefined;
    }
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
