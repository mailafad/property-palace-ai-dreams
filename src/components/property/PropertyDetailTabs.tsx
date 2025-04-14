
import { useState } from 'react';
import { Property } from '@/types/property';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyDescription from '@/components/property/PropertyDescription';
import PropertyFeatures from '@/components/property/PropertyFeatures';
import PropertyLocation from '@/components/property/PropertyLocation';

interface PropertyDetailTabsProps {
  property: Property;
}

const PropertyDetailTabs = ({ property }: PropertyDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState('description');
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
      </TabsList>
      
      <TabsContent value="description">
        <PropertyDescription property={property} />
      </TabsContent>
      
      <TabsContent value="features">
        <PropertyFeatures property={property} />
      </TabsContent>
      
      <TabsContent value="location">
        <PropertyLocation property={property} />
      </TabsContent>
    </Tabs>
  );
};

export default PropertyDetailTabs;
