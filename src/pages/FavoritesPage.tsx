
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PropertyList from '@/components/PropertyList';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HeartOff } from 'lucide-react';

const FavoritesPage = () => {
  const { filteredProperties, loading } = useProperty();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);
  
  if (authLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 container px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Your Favorite Properties</h1>
        <p className="text-muted-foreground mb-6">
          {filteredProperties.length > 0 
            ? `You have ${filteredProperties.length} saved properties`
            : 'You have no saved properties yet'}
        </p>
        
        {!loading && filteredProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <HeartOff className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Favorite Properties</h2>
            <p className="text-muted-foreground mb-4">
              You haven't saved any properties to your favorites yet.
            </p>
            <a 
              href="/properties" 
              className="text-primary hover:underline"
            >
              Browse available properties
            </a>
          </div>
        ) : (
          <PropertyList />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default FavoritesPage;
