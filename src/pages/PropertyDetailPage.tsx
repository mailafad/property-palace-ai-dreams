
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
  // Share button handler
  const handleShare = async () => {
    if (!property) return;
    const shareUrl = `https://www.adrealestates.in/api/property-share-id?id=${property.id}`;
    const shareTitle = property.title;
    const shareText = `Check out this property: ${property.title}`;
    const shareImage = property.images?.[0];

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy link
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  // Set Open Graph meta tags for sharing preview
  useEffect(() => {
    if (!property) return;
    const metaTags = [
      { property: "og:title", content: property.title },
      { property: "og:description", content: property.description || "" },
      { property: "og:image", content: property.images?.[0] || "" },
      { property: "og:url", content: window.location.href },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: property.title },
      { name: "twitter:description", content: property.description || "" },
      { name: "twitter:image", content: property.images?.[0] || "" },
    ];
    metaTags.forEach(tag => {
      let element = document.querySelector(`meta[${tag.property ? "property" : "name"}="${tag.property || tag.name}"]`);
      if (!element) {
        element = document.createElement("meta");
        if (tag.property) element.setAttribute("property", tag.property);
        if (tag.name) element.setAttribute("name", tag.name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", tag.content);
    });
  }, [property]);

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

        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 w-full max-w-full">
          <div>
            <PropertyDetailHeader property={property} onShare={handleShare} />
            <PropertyPriceCard property={property} />
            <div className="mb-10 md:mb-6">
              <PropertyImageGallery property={property} />
            </div>
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
