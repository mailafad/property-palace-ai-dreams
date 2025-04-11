
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { useProperty } from '@/contexts/PropertyContext';
import { Property } from '@/types/property';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Bed, Bath, Square, MapPin, Calendar, Phone, Mail, 
  ChevronLeft, User, Heart, Share
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById } = useProperty();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | undefined>(undefined);
  
  useEffect(() => {
    if (!id) return;
    
    const propertyData = getPropertyById(id);
    setProperty(propertyData);
    
    if (!propertyData) {
      toast.error("Property not found");
      navigate('/properties');
    }
    
    window.scrollTo(0, 0);
  }, [id, getPropertyById, navigate]);
  
  if (!property) return null;
  
  const statusColors = {
    'for-sale': 'bg-green-500',
    'for-rent': 'bg-blue-500',
    'sold': 'bg-red-500',
    'pending': 'bg-yellow-500'
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 container px-4 py-8">
        <Link to="/properties" className="flex items-center text-primary hover:underline mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Properties
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <div>
            {/* Property Title and Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className={`${statusColors[property.status]} text-white`}>
                    {property.status.replace('-', ' ')}
                  </Badge>
                  {property.featured && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Featured
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <p>{property.address}, {property.city}, {property.state} {property.zipCode}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Property Price and Key Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Price</p>
                  <p className="text-2xl md:text-3xl font-bold text-primary">
                    {formatCurrency(property.price)}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-lg font-semibold">{property.bedrooms}</p>
                      <p className="text-xs text-muted-foreground">Bedrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-lg font-semibold">{property.bathrooms}</p>
                      <p className="text-xs text-muted-foreground">Bathrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-lg font-semibold">{property.area}</p>
                      <p className="text-xs text-muted-foreground">Sq Ft</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Property Images */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 rounded-lg overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                  {property.images.slice(1, 3).map((image, index) => (
                    <div key={index} className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Property Details Tabs */}
            <Tabs defaultValue="description">
              <TabsList className="mb-6">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">About This Property</h2>
                <div className="prose max-w-none">
                  <p className="mb-4">{property.description}</p>
                  
                  {property.aiDescription && (
                    <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <h3 className="text-lg font-medium mb-2">Property Highlights</h3>
                      <p className="text-muted-foreground">{property.aiDescription}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Property Features</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Basic Information</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Property Type</span>
                        <span className="font-medium capitalize">{property.type}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Year Built</span>
                        <span className="font-medium">{property.yearBuilt}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Square Footage</span>
                        <span className="font-medium">{property.area} sq ft</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Bedrooms</span>
                        <span className="font-medium">{property.bedrooms}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Bathrooms</span>
                        <span className="font-medium">{property.bathrooms}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Additional Features</h3>
                    <ul className="space-y-2">
                      {property.features.map((feature, index) => (
                        <li key={index} className="flex justify-between">
                          <span className="text-muted-foreground">{feature.name}</span>
                          <span className="font-medium">
                            {typeof feature.value === 'boolean' 
                              ? (feature.value ? 'Yes' : 'No') 
                              : feature.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <p>{property.address}, {property.city}, {property.state} {property.zipCode}</p>
                </div>
                
                <div className="aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center p-4">
                    <MapPin className="h-8 w-8 mb-2 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">Map view would be displayed here</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Neighborhood</h3>
                  <p className="text-muted-foreground">
                    This property is located in a desirable neighborhood with easy access to shopping, dining,
                    and entertainment options. The area offers excellent schools and convenient transportation links.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
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
                  <span className="capitalize">{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="capitalize">{property.status.replace('-', ' ')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
