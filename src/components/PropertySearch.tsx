
import { useState } from 'react';
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
import { PropertyType } from '@/types/property';
import { Search, X } from 'lucide-react';

const PropertySearch = () => {
  const { filter, setFilter } = useProperty();
  const [localFilter, setLocalFilter] = useState({ ...filter });

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
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

        <div className="flex flex-col sm:flex-row gap-2">
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
