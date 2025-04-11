
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Home, LogOut, Building, LayoutDashboard } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const AdminHeader = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useAuth();
  
  const handleLogout = async () => {
    await signOut();
    // Auth context will handle navigation
  };
  
  return (
    <header className="bg-white border-b py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">PropertyPalace Admin</span>
        </div>
        
        {isMobile ? (
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/admin/dashboard" className="flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin/properties" className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  Properties
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  View Website
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard">
              <Button variant="ghost">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/admin/properties">
              <Button variant="ghost">
                <Building className="mr-2 h-4 w-4" />
                Properties
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost">
                <Home className="mr-2 h-4 w-4" />
                View Website
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
