
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Property } from '@/types/property';
import { useAuth } from '@/contexts/AuthContext';
import { useProperty } from '@/contexts/PropertyContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface ContactFormProps {
  property?: Property;
}

const ContactForm: React.FC<ContactFormProps> = ({ property }) => {
  const { user, profile } = useAuth();
  const { addToFavorites } = useProperty();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: property 
      ? `Hi, I'm interested in the property at ${property.address}. Please contact me with more information.` 
      : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Auto-fill form with user data if available
  useEffect(() => {
    if (user && profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.full_name || '',
        email: user.email || '',
        phone: profile.phone || '',
      }));
    }
  }, [user, profile]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Submitting contact form:', formData);
      
      // If property exists and user is logged in, add to favorites
      if (property && user) {
        await addToFavorites(property.id);
        toast.success('Property added to your favorites!');
      } else if (property && !user) {
        // If property exists but user is not logged in, prompt to login
        toast.info('Please sign in to save this property to your favorites', {
          action: {
            label: 'Sign In',
            onClick: () => navigate('/auth'),
          },
        });
      }
      
      // Insert contact inquiry into database with required fields
      const { error } = await supabase.from('contact_inquiries').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided', // Ensure phone is never null
        message: formData.message,
        property_id: property?.id || null,
        user_id: user?.id || null,
        status: 'new'
      });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Form submitted to DB successfully:', formData);
      toast.success('Your message has been sent! A realtor will contact you shortly.');
      
      // Only reset message part of the form
      setFormData(prev => ({
        ...prev,
        message: '',
      }));
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98765 43210"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="I'm interested in this property..."
          rows={4}
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
      
      {property && !user && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          Sign in to save this property to your favorites
        </p>
      )}
    </form>
  );
};

export default ContactForm;
