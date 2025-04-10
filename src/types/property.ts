
export type PropertyType = 'house' | 'apartment' | 'condo' | 'townhouse' | 'villa' | 'land';

export interface Feature {
  name: string;
  value: string | number | boolean;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  description: string;
  aiDescription?: string;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number; // square feet
  yearBuilt: number;
  features: Feature[];
  images: string[];
  featured: boolean;
  status: 'for-sale' | 'for-rent' | 'sold' | 'pending';
  createdAt: string;
  updatedAt: string;
  realtor: {
    name: string;
    phone: string;
    email: string;
    photo?: string;
  };
}

export interface PropertyFilter {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: PropertyType;
  status?: Property['status'];
}
