
import { Property } from '@/types/property';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyDescription from './PropertyDescription';
import PropertyFeatures from './PropertyFeatures';
import PropertyLocation from './PropertyLocation';

interface PropertyDetailTabsProps {
  property: Property;
}

const PropertyDetailTabs = ({ property }: PropertyDetailTabsProps) => {
  return (
    <Tabs defaultValue="description">
      <TabsList className="mb-6">
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
