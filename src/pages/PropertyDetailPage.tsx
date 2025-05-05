
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useProperty } from '@/contexts/PropertyContext';
import { Property } from '@/types/property';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

// Import refactored components
import PropertyDetailHeader from '@/components/property/PropertyDetailHeader';
import PropertyPriceCard from '@/components/property/PropertyPriceCard';
import PropertyImageGallery from '@/components/property/PropertyImageGallery';
import PropertyDetailTabs from '@/components/property/PropertyDetailTabs';
import PropertySidebar from '@/components/property/PropertySidebar';

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById } = useProperty();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | undefined>(undefined);
  
  const { loading } = useProperty();

  useEffect(() => {
    if (!id) return;

    // Wait for properties to finish loading before checking
    if (loading) return;

    const propertyData = getPropertyById(id);
    setProperty(propertyData);

    if (!propertyData) {
      toast.error("Property not found");
      navigate('/properties');
    }

    window.scrollTo(0, 0);
  }, [id, getPropertyById, navigate, loading]);
  
  const { loading: loadingProperties } = useProperty();
  if (loadingProperties) return <div className="text-center py-10">Loading...</div>;
  if (!property) return null;
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 container px-4 py-8">
        <Link to="/properties" className="flex items-center text-black hover:underline mb-4">
          <ChevronLeft className="h-4 w-4 mr-1 text-black" />
          <span className="text-black">Back to Properties</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <div>
            <PropertyDetailHeader property={property} />
            <PropertyPriceCard property={property} />
            <PropertyImageGallery property={property} />
            <PropertyDetailTabs property={property} />
          </div>
          
          <PropertySidebar property={property} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
