
import { useState } from 'react';
import { Property } from '@/types/property';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyDescription from '@/components/property/PropertyDescription';
import PropertyFeatures from '@/components/property/PropertyFeatures';
import PropertyLocation from '@/components/property/PropertyLocation';
import { useIsMobile } from '@/hooks/use-mobile';

interface PropertyDetailTabsProps {
  property: Property;
}

const PropertyDetailTabs = ({ property }: PropertyDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState('description');
  const isMobile = useIsMobile();
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <TabsList className={`mb-8 ${isMobile ? 'flex flex-col w-full gap-2' : 'grid grid-cols-3'}`}>
        <TabsTrigger value="description" className={isMobile ? 'w-full' : ''}>Description</TabsTrigger>
        <TabsTrigger value="features" className={isMobile ? 'w-full' : ''}>Features</TabsTrigger>
        <TabsTrigger value="location" className={isMobile ? 'w-full' : ''}>Location</TabsTrigger>
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
