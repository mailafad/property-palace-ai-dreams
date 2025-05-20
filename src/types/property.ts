export type MainPropertyType = 'land' | 'individual-house' | 'individual-bungalow' | 'flat-apartment' | 'villa';

export type LandType = 'residential' | 'commercial' | 'industrial' | 'agricultural';
export type FlatApartmentType = 'studio' | 'duplex' | 'penthouse';
export type VillaType = 'individual' | 'twin' | 'row-house' | 'semi-independent' | 'beach';

export interface PropertyTypeDetails {
  mainType: MainPropertyType;
  subType?: LandType | FlatApartmentType | VillaType;
}

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
  type: PropertyTypeDetails;
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
    id: string;
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
  propertyType?: MainPropertyType;
  propertySubType?: LandType | FlatApartmentType | VillaType;
  status?: Property['status'];
}
