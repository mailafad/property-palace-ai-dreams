import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useProperty } from '@/contexts/PropertyContext';
import { Property, PropertyType } from '@/types/property';
import { generateUniqueId, getImagePlaceholder } from '@/lib/utils';
import { generateAIDescription } from '@/utils/aiDescriptionGenerator';
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useIsMobile } from '@/hooks/use-mobile';

const PropertyFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const { getPropertyById, addProperty, updateProperty } = useProperty();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  
  const emptyProperty: Partial<Property> = {
    title: '',
    price: 0,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    aiDescription: '',
    type: 'house',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    yearBuilt: new Date().getFullYear(),
    features: [
      { name: 'Garage', value: 0 },
      { name: 'Pool', value: false },
      { name: 'Central AC', value: false },
      { name: 'Fireplace', value: false },
      { name: 'Waterfront', value: false }
    ],
    images: [getImagePlaceholder(), getImagePlaceholder()],
    featured: false,
    status: 'for-sale',
    realtor: {
      name: '',
      phone: '',
      email: '',
      photo: ''
    }
  };
  
  const [formData, setFormData] = useState<Partial<Property>>(emptyProperty);
  
  useEffect(() => {
    const adminAuthenticated = localStorage.getItem('adminAuthenticated');
    if (adminAuthenticated !== 'true') {
      navigate('/admin');
    } else {
      setIsAdmin(true);
    }
  }, [navigate]);
  
  useEffect(() => {
    if (isEditing && id) {
      const property = getPropertyById(id);
      if (property) {
        setFormData(property);
      } else {
        toast.error('Property not found');
        navigate('/admin/properties');
      }
    }
  }, [isEditing, id, getPropertyById, navigate]);
  
  if (!isAdmin) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (['price', 'bedrooms', 'bathrooms', 'area', 'yearBuilt'].includes(name)) {
      setFormData({
        ...formData,
        [name]: value === '' ? 0 : Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSelectChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFeatureChange = (index: number, value: string | boolean | number) => {
    const updatedFeatures = [...(formData.features || [])];
    
    if (typeof updatedFeatures[index].value === 'boolean') {
      updatedFeatures[index].value = typeof value === 'string' ? value === 'true' : !!value;
    } else if (typeof updatedFeatures[index].value === 'number') {
      updatedFeatures[index].value = typeof value === 'string' ? parseInt(value) || 0 : Number(value);
    } else {
      updatedFeatures[index].value = value;
    }
    
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isEditing && id) {
        updateProperty(id, {
          ...formData,
          updatedAt: new Date().toISOString()
        });
        toast.success('Property updated successfully');
      } else {
        if (formData.title && formData.address && formData.price) {
          addProperty({
            ...formData as Omit<Property, "id" | "createdAt" | "updatedAt">,
          });
          toast.success('Property added successfully');
        } else {
          toast.error('Please fill in all required fields');
          setIsSubmitting(false);
          return;
        }
      }
      
      navigate('/admin/properties');
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error('An error occurred while saving the property');
      setIsSubmitting(false);
    }
  };
  
  const generatePropertyDescription = async () => {
    if (!formData.bedrooms || !formData.bathrooms || !formData.area || !formData.city) {
      toast.error('Please fill in basic property details first');
      return;
    }
    
    setIsGeneratingDescription(true);
    
    try {
      const featureNames = formData.features
        ?.filter(f => {
          if (typeof f.value === 'boolean') return f.value;
          if (typeof f.value === 'number') return f.value > 0;
          return false;
        })
        .map(f => f.name) || [];
        
      const aiDescription = await generateAIDescription({
        bedrooms: formData.bedrooms || 0,
        bathrooms: formData.bathrooms || 0,
        squareFeet: formData.area || 0,
        propertyType: formData.type || 'house',
        yearBuilt: formData.yearBuilt || new Date().getFullYear(),
        location: `${formData.city}, ${formData.state}`,
        features: featureNames
      });
      
      setFormData({
        ...formData,
        aiDescription
      });
      
      toast.success('AI description generated successfully');
    } catch (error) {
      console.error('Error generating AI description:', error);
      toast.error('Failed to generate AI description');
    } finally {
      setIsGeneratingDescription(false);
    }
  };
  
  const handleRealtorChange = (field: keyof Property['realtor'], value: string) => {
    setFormData({
      ...formData,
      realtor: {
        name: formData.realtor?.name || '',
        phone: formData.realtor?.phone || '',
        email: formData.realtor?.email || '',
        photo: formData.realtor?.photo || '',
        ...formData.realtor,
        [field]: value
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="container px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/properties')}
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
          <h1 className="text-3xl font-bold">{isEditing ? 'Edit Property' : 'Add New Property'}</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the main details about the property</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title*</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price*</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Property Type*</Label>
                      <Select
                        value={formData.type || 'house'}
                        onValueChange={(value) => handleSelectChange(value, 'type')}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address*</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City*</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State*</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code*</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                  <CardDescription>Provide the specific details of the property</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        value={formData.bedrooms || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input
                        id="bathrooms"
                        name="bathrooms"
                        type="number"
                        step="0.5"
                        value={formData.bathrooms || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Square Feet</Label>
                      <Input
                        id="area"
                        name="area"
                        type="number"
                        value={formData.area || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearBuilt">Year Built</Label>
                      <Input
                        id="yearBuilt"
                        name="yearBuilt"
                        type="number"
                        value={formData.yearBuilt || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <Label className="block mb-3">Features</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formData.features?.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{feature.name}</span>
                          {typeof feature.value === 'boolean' ? (
                            <Switch
                              checked={feature.value}
                              onCheckedChange={(checked) => handleFeatureChange(index, checked)}
                            />
                          ) : (
                            <Input
                              type="number"
                              value={feature.value || ''}
                              onChange={(e) => handleFeatureChange(index, e.target.value)}
                              className="w-20"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Property Description</CardTitle>
                  <CardDescription>Provide detailed information about the property</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Basic Description*</Label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="aiDescription">AI-Generated Description</Label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={generatePropertyDescription}
                        disabled={isGeneratingDescription}
                      >
                        {isGeneratingDescription ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate AI Description
                          </>
                        )}
                      </Button>
                    </div>
                    <Textarea
                      id="aiDescription"
                      name="aiDescription"
                      rows={6}
                      value={formData.aiDescription || ''}
                      onChange={handleChange}
                      placeholder="Click the button above to generate an AI description based on property details"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Images</CardTitle>
                  <CardDescription>Add images of the property</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image1">Main Image URL</Label>
                    <Input
                      id="image1"
                      placeholder="https://example.com/image.jpg"
                      value={formData.images?.[0] || ''}
                      onChange={(e) => {
                        const updatedImages = [...(formData.images || [])];
                        updatedImages[0] = e.target.value;
                        setFormData({ ...formData, images: updatedImages });
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image2">Additional Image URL</Label>
                    <Input
                      id="image2"
                      placeholder="https://example.com/image2.jpg"
                      value={formData.images?.[1] || ''}
                      onChange={(e) => {
                        const updatedImages = [...(formData.images || [])];
                        updatedImages[1] = e.target.value;
                        setFormData({ ...formData, images: updatedImages });
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image3">Additional Image URL</Label>
                    <Input
                      id="image3"
                      placeholder="https://example.com/image3.jpg"
                      value={formData.images?.[2] || ''}
                      onChange={(e) => {
                        const updatedImages = [...(formData.images || [])];
                        updatedImages[2] = e.target.value;
                        setFormData({ ...formData, images: updatedImages });
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Realtor Information</CardTitle>
                  <CardDescription>Contact details for the listing agent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="realtorName">Name</Label>
                    <Input
                      id="realtorName"
                      value={formData.realtor?.name || ''}
                      onChange={(e) => {
                        handleRealtorChange('name', e.target.value);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="realtorEmail">Email</Label>
                    <Input
                      id="realtorEmail"
                      type="email"
                      value={formData.realtor?.email || ''}
                      onChange={(e) => {
                        handleRealtorChange('email', e.target.value);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="realtorPhone">Phone</Label>
                    <Input
                      id="realtorPhone"
                      value={formData.realtor?.phone || ''}
                      onChange={(e) => {
                        handleRealtorChange('phone', e.target.value);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="realtorPhoto">Photo URL</Label>
                    <Input
                      id="realtorPhoto"
                      placeholder="https://example.com/photo.jpg"
                      value={formData.realtor?.photo || ''}
                      onChange={(e) => {
                        handleRealtorChange('photo', e.target.value);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Property Status</CardTitle>
                  <CardDescription>Set the current status and visibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status || 'for-sale'}
                      onValueChange={(value) => handleSelectChange(value, 'status')}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="for-sale">For Sale</SelectItem>
                        <SelectItem value="for-rent">For Rent</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Featured Property</Label>
                    <Switch
                      id="featured"
                      checked={formData.featured || false}
                      onCheckedChange={(checked) => {
                        setFormData({
                          ...formData,
                          featured: checked
                        });
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/properties')}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditing ? 'Update Property' : 'Create Property'
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PropertyFormPage;
