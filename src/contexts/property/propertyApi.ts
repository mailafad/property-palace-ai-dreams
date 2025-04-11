
import { Property } from '@/types/property';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export async function fetchProperties() {
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
        realtor: realtors || { id: '', name: '', phone: '', email: '', photo: null }
      } as Property;
    });
  } catch (error) {
    console.error('Error in fetchProperties:', error);
    return [];
  }
}

export async function addPropertyToDb(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) {
  const { realtor, ...propertyData } = property;
  
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
}

export async function updatePropertyInDb(id: string, updatedFields: Partial<Property>) {
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
}

export async function deletePropertyFromDb(id: string) {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);
  
  if (error) {
    toast.error('Error deleting property');
    throw error;
  }
}
