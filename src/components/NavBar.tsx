
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Home, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">PropertyPalace</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
          <Link to="/properties" className="text-gray-700 hover:text-primary">Properties</Link>
          <Link to="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {!isMobile && (
            <Link to="/properties">
              <Button variant="outline" size="sm" className="flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Search Properties
              </Button>
            </Link>
          )}
          
          <Link to="/admin">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
