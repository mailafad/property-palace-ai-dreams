
import { Property, Feature } from '@/types/property';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

export async function fetchProperties() {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_code,
        realtors:realtor_id (
          id,
          name,
          phone,
          email,
          photo
        )
      `);
    
    if (error) {
      console.error('Error loading properties', error);
      throw error;
    }
    
    return data
      .filter(item => typeof item === 'object' && item !== null)
      .map(item => {
        // item may have property_code and realtors as separate keys
        // Defensive: Only destructure if keys exist
        const realtors = (item as any).realtors ?? null;
        const property_code = (item as any).property_code ?? undefined;
        // Only spread if item is an object
        let property: any = {};
        // Only spread if item is a plain object and not null/array
        if (
          typeof item === 'object' &&
          item !== null &&
          !Array.isArray(item)
        ) {
          property = { ...(item as Record<string, any>) };
          delete property.realtors;
          delete property.property_code;
        } else {
          // If not a plain object, skip this item
          return null;
        }

        // Convert the database features (Json) to our app's Feature[] type
        const features: Feature[] = Array.isArray(property.features)
          ? property.features.map((item: any) => ({
              name: item.name || '',
              value: item.value !== undefined ? item.value : ''
            }))
          : [];

        return {
          id: property.id,
          propertyCode: property_code || undefined,
          title: property.title,
          price: property.price,
          address: property.address,
          city: property.city,
          state: property.state,
          zipCode: property.zip_code,
          youtubeLink: property.youtube_link || undefined,
          description: property.description,
          aiDescription: property.ai_description,
          // Convert string type from database to our app's type structure
          type: {
            mainType: property.type_main as Property['type']['mainType'],
            subType: property.type_sub || undefined
          },
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area: property.area,
          yearBuilt: property.year_built,
          features: features,
          images: property.images,
          featured: property.featured,
          status: property.status as Property['status'],
          createdAt: property.created_at,
          updatedAt: property.updated_at,
          realtor: realtors || { id: '', name: '', phone: '', email: '', photo: null }
        } as Property;
      }).filter(Boolean);
  } catch (error) {
    console.error('Error in fetchProperties:', error);
    return [];
  }
}

export async function addPropertyToDb(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) {
  const { realtor, ...propertyData } = property;

  // Convert our app's Feature[] to Json format for the database
  const featuresJson = propertyData.features as unknown as Json;

  // 1. Get the current max property_code number
  let nextCode = 'ad1';
  const { data: codeRows, error: codeError } = await supabase
    .from('properties')
    .select('property_code')
    .order('created_at', { ascending: true });

  if (!codeError && Array.isArray(codeRows)) {
    // Extract numbers from codes like 'ad1', 'ad2', ...
    const nums = codeRows
      .map((row: any) => {
        const match = typeof row.property_code === 'string' && row.property_code.match(/^ad(\d+)$/);
        return match ? parseInt(match[1], 10) : null;
      })
      .filter((n: number | null) => n !== null) as number[];
    const maxNum = nums.length > 0 ? Math.max(...nums) : 0;
    nextCode = `ad${maxNum + 1}`;
  }

  // Create the property object to insert, ensuring we don't pass empty UUID values
  const propertyToInsert = {
    title: propertyData.title,
    price: propertyData.price,
    address: propertyData.address,
    city: propertyData.city,
    state: propertyData.state,
    zip_code: propertyData.zipCode,
    youtube_link: propertyData.youtubeLink || null,
    description: propertyData.description,
    ai_description: propertyData.aiDescription,
    type_main: property.type?.mainType || 'individual-house',
    type_sub: property.type?.subType || null,
    bedrooms: propertyData.bedrooms,
    bathrooms: propertyData.bathrooms,
    area: propertyData.area,
    year_built: propertyData.yearBuilt,
    features: featuresJson,
    images: propertyData.images,
    featured: propertyData.featured,
    status: propertyData.status,
    property_code: nextCode,
    // Only include realtor_id if it's a valid non-empty string
    ...(realtor?.id && realtor.id !== '' ? { realtor_id: realtor.id } : {})
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
    console.error('Error adding property', error);
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
  if (propertyData.youtubeLink !== undefined) propertyToUpdate.youtube_link = propertyData.youtubeLink || null;
  if (propertyData.description !== undefined) propertyToUpdate.description = propertyData.description;
  if (propertyData.aiDescription !== undefined) propertyToUpdate.ai_description = propertyData.aiDescription;
  if (propertyData.type !== undefined) {
    propertyToUpdate.type_main = propertyData.type.mainType;
    propertyToUpdate.type_sub = propertyData.type.subType;
  }
  if (propertyData.bedrooms !== undefined) propertyToUpdate.bedrooms = propertyData.bedrooms;
  if (propertyData.bathrooms !== undefined) propertyToUpdate.bathrooms = propertyData.bathrooms;
  if (propertyData.area !== undefined) propertyToUpdate.area = propertyData.area;
  if (propertyData.yearBuilt !== undefined) propertyToUpdate.year_built = propertyData.yearBuilt;
  if (propertyData.features !== undefined) propertyToUpdate.features = propertyData.features as unknown as Json;
  if (propertyData.images !== undefined) propertyToUpdate.images = propertyData.images;
  if (propertyData.featured !== undefined) propertyToUpdate.featured = propertyData.featured;
  if (propertyData.status !== undefined) propertyToUpdate.status = propertyData.status;
  
  // Only include realtor_id if it's a valid non-empty string
  if (realtor?.id && realtor.id !== '') {
    propertyToUpdate.realtor_id = realtor.id;
  }
  
  propertyToUpdate.updated_at = new Date().toISOString();
  
  const { error } = await supabase
    .from('properties')
    .update(propertyToUpdate)
    .eq('id', id);
  
  if (error) {
    console.error('Error updating property', error);
    throw error;
  }
}

export async function deletePropertyFromDb(id: string) {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting property', error);
    throw error;
  }
}
