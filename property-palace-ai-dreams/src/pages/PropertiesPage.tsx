
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PropertyList from '@/components/PropertyList';
import PropertySearch from '@/components/PropertySearch';
import { useProperty } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const PropertiesPage = () => {
  const { filteredProperties } = useProperty();
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 container px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Browse Properties</h1>
        <p className="text-muted-foreground mb-6">
          Find your perfect property from our {filteredProperties.length} available listings
        </p>
        
        {isMobile && (
          <Button 
            variant="outline" 
            className="w-full mb-4 flex items-center justify-between"
            onClick={() => setShowFilters(!showFilters)}
          >
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter Properties
            </div>
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <div className={`${isMobile && !showFilters ? 'hidden' : ''}`}>
            <PropertySearch />
          </div>
          
          <div>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProperties.length} properties
              </p>
              
              {/* Can be expanded with sorting options if needed */}
            </div>
            
            <PropertyList />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertiesPage;
