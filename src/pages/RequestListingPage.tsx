import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const listingRequestSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters' }),
  state: z.string().min(2, { message: 'State must be at least 2 characters' }),
  zip_code: z.string().min(5, { message: 'Zip code must be at least 5 characters' }),
  price: z.string().min(1, { message: 'Price is required' }),
  bedrooms: z.string().min(1, { message: 'Number of bedrooms is required' }),
  bathrooms: z.string().min(1, { message: 'Number of bathrooms is required' }),
  area: z.string().min(1, { message: 'Area is required' }),
  year_built: z.string().min(1, { message: 'Year built is required' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  type: z.string().min(1, { message: 'Property type is required' }),
});

type ListingRequestFormValues = z.infer<typeof listingRequestSchema>;

const RequestListingPage = () => {
  const [loading, setLoading] = useState(false);
  const { user, profile } = useAuth();
  
  const form = useForm<ListingRequestFormValues>({
    resolver: zodResolver(listingRequestSchema),
    defaultValues: {
      title: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      year_built: '',
      description: '',
      type: 'residential',
    },
  });

  const onSubmit = async (data: ListingRequestFormValues) => {
    if (!user) {
      toast.error('You must be logged in to submit a listing request');
      return;
    }

    setLoading(true);
    
    try {
      // Convert numeric fields from string to numbers
      const numericData = {
        price: parseFloat(data.price),
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseFloat(data.bathrooms),
        area: parseFloat(data.area),
        year_built: parseInt(data.year_built),
      };
      
      // Submit the listing request with the correct field structure
      // matching the Supabase table requirements
      const { error } = await supabase
        .from('listing_requests')
        .insert({
          title: data.title,
          address: data.address,
          city: data.city,
          state: data.state,
          zip_code: data.zip_code,
          description: data.description,
          type: data.type,
          price: numericData.price,
          bedrooms: numericData.bedrooms,
          bathrooms: numericData.bathrooms,
          area: numericData.area,
          year_built: numericData.year_built,
          user_id: user.id,
          contact_email: user.email || '',
          contact_name: profile?.full_name || user.email || '',
          contact_phone: profile?.phone || '',
          status: 'pending'
        });
      
      if (error) throw error;
      
      toast.success('Listing request submitted successfully!');
      form.reset();
    } catch (error: any) {
      console.error('Error submitting listing request:', error);
      toast.error(error.message || 'Failed to submit listing request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Request Property Listing</h1>
          
          <div className="bg-white rounded-lg p-6 shadow">
            <p className="mb-6 text-muted-foreground">
              Fill out this form to request a listing for your property. Our team will review your submission and get back to you soon.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Modern Apartment in City Center" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="land">Land</SelectItem>
                            <SelectItem value="industrial">Industrial</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 2500000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-3 gap-2">
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area (sqft)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-3 gap-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="zip_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="year_built"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Built</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your property..." 
                          className="h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full text-black" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
                      <span className="text-black">Submitting...</span>
                    </>
                  ) : (
                    <span className="text-black">Submit Listing Request</span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RequestListingPage;
