
import { Property, PropertyFilter } from '@/types/property';

export function applyFilters(properties: Property[], filter: PropertyFilter): Property[] {
  if (!properties) return [];
  
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
}
