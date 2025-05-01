
import { Property } from '@/types/property';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPropertyType } from '@/utils/propertyTypeUtils';
import ContactForm from '@/components/ContactForm';
import { User, Phone } from 'lucide-react';

interface PropertySidebarProps {
  property: Property;
}

const PropertySidebar = ({ property }: PropertySidebarProps) => {
  console.log("Property type debug:", property.type);
  return (
    <div className="space-y-6">
      {/* Contact Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Realtor</CardTitle>
          <CardDescription>Interested in this property? Send a message to the listing agent.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="mr-3">
              {property.realtor?.photo ? (
                <img 
                  src={property.realtor.photo} 
                  alt={property.realtor.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>
            <div>
              <p className="font-medium">{property.realtor?.name || 'Agent'}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-3 w-3 mr-1" />
                <span>{property.realtor?.phone || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <ContactForm property={property} />
        </CardContent>
      </Card>
      
      {/* Property Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Listed</span>
            <span>{new Date(property.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Property ID</span>
            <span>#{property.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Property Type</span>
            <span className="capitalize">{formatPropertyType(property)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="capitalize">{property.status.replace('-', ' ')}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertySidebar;
