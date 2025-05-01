import { useState, useEffect } from 'react';
import { useProperty } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MainPropertyType, LandType, FlatApartmentType, VillaType } from '@/types/property';
import { Search, X } from 'lucide-react';

const PropertySearch = () => {
  const { filter, setFilter } = useProperty();
  const [localFilter, setLocalFilter] = useState({ ...filter });
  const [showSubTypes, setShowSubTypes] = useState(false);

  const getSubTypeOptions = (mainType: MainPropertyType | undefined) => {
    switch (mainType) {
      case 'land':
        return [
          { value: 'residential', label: 'Residential' },
          { value: 'commercial', label: 'Commercial' },
          { value: 'industrial', label: 'Industrial' },
          { value: 'agricultural', label: 'Agricultural' },
        ];
      case 'flat-apartment':
        return [
          { value: 'studio', label: 'Studio' },
          { value: 'duplex', label: 'Duplex' },
          { value: 'penthouse', label: 'Penthouse' },
        ];
      case 'villa':
        return [
          { value: 'individual', label: 'Individual Villa' },
          { value: 'twin', label: 'Twin Villa' },
          { value: 'row-house', label: 'Row House Villa' },
          { value: 'semi-independent', label: 'Semi Independent Villa' },
          { value: 'beach', label: 'Beach Villa' },
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    // Show/hide sub-types based on main property type
    const hasSubTypes = ['land', 'flat-apartment', 'villa'].includes(localFilter.propertyType || '');
    setShowSubTypes(hasSubTypes);
    
    // Clear subType if main type doesn't have subtypes
    if (!hasSubTypes) {
      setLocalFilter(prev => ({ ...prev, propertySubType: undefined }));
    }
  }, [localFilter.propertyType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilter(prev => ({
      ...prev,
      [name]: value === '' ? undefined : name === 'search' ? value : Number(value),
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setLocalFilter(prev => ({
      ...prev,
      [name]: value === 'any' ? undefined : name === 'bedrooms' || name === 'bathrooms' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter(localFilter);
  };

  const clearFilters = () => {
    setLocalFilter({});
    setFilter({});
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border max-w-[320px] lg:max-w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              name="search"
              placeholder="Search by location, address, or property name"
              value={localFilter.search || ''}
              onChange={handleInputChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="minPrice">Min Price</Label>
            <Input
              id="minPrice"
              name="minPrice"
              type="number"
              placeholder="Min Price"
              value={localFilter.minPrice || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxPrice">Max Price</Label>
            <Input
              id="maxPrice"
              name="maxPrice"
              type="number"
              placeholder="Max Price"
              value={localFilter.maxPrice || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select
              value={localFilter.propertyType || 'any'}
              onValueChange={(value) => handleSelectChange(value, 'propertyType')}
            >
              <SelectTrigger id="propertyType">
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any type</SelectItem>
                <SelectItem value="land">Land / Plot</SelectItem>
                <SelectItem value="individual-house">Individual House</SelectItem>
                <SelectItem value="individual-bungalow">Individual Bungalow</SelectItem>
                <SelectItem value="flat-apartment">Flat / Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {showSubTypes && (
          <div className="mb-4">
            <div className="space-y-2">
              <Label htmlFor="propertySubType">Property Sub-Type</Label>
              <Select
                value={localFilter.propertySubType || 'any'}
                onValueChange={(value) => handleSelectChange(value, 'propertySubType')}
              >
                <SelectTrigger id="propertySubType">
                  <SelectValue placeholder="Any sub-type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any sub-type</SelectItem>
                  {getSubTypeOptions(localFilter.propertyType as MainPropertyType).map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Select
              value={localFilter.bedrooms?.toString() || 'any'}
              onValueChange={(value) => handleSelectChange(value, 'bedrooms')}
            >
              <SelectTrigger id="bedrooms">
                <SelectValue placeholder="Any bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any bedrooms</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Select
              value={localFilter.bathrooms?.toString() || 'any'}
              onValueChange={(value) => handleSelectChange(value, 'bathrooms')}
            >
              <SelectTrigger id="bathrooms">
                <SelectValue placeholder="Any bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any bathrooms</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-between">
          <Button type="submit" className="flex-1">
            <Search className="mr-2 h-4 w-4" />
            Search Properties
          </Button>
          <Button type="button" variant="outline" onClick={clearFilters}>
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertySearch;
