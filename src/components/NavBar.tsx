
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Heart, Home, Phone, User as UserIcon, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import '@/styles/ad-realtor-styles.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const isMobile = useIsMobile();
  const { user, profile, signOut, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar shadow-lg bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <i className="fas fa-home text-primary text-2xl mr-2"></i>
              <Link to="/" className="text-xl font-bold brand">AD Realestate</Link>
            </div>
          </div>

          {isMobile ? (
            <div className="flex items-center">
              <Button variant="outline" onClick={toggleMobileMenu} className="p-2 text-white bg-transparent border-white">
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
              <Link to="/properties?type=buy" className="nav-item px-3 py-2 text-sm font-medium">Buy</Link>
              <Link to="/properties?type=sell" className="nav-item px-3 py-2 text-sm font-medium">Sell</Link>
              <Link to="/properties?type=rent" className="nav-item px-3 py-2 text-sm font-medium">Rent</Link>
              <Link to="/contact" className="nav-item px-3 py-2 text-sm font-medium">Contact</Link>
              <Link to="/request-listing" className="nav-item px-3 py-2 text-sm font-medium">Request Listing</Link>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="nav-item px-3 py-2 text-sm font-medium">Account</button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <div className="flex items-center px-2 py-2">
                      <div className="ml-2">
                        <p className="text-sm font-medium">{profile?.full_name || user.email}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="cursor-pointer w-full">
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/favorites" className="cursor-pointer w-full flex items-center">
                        <Heart className="mr-2 h-4 w-4 text-red-500" />
                        Saved Properties
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth" className="nav-item px-3 py-2 text-sm font-medium">
                  Sign In
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu - Updated for better visibility */}
      {isMobile && mobileMenuOpen && (
        <div className="mobile-menu" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-black">Menu</h2>
              <Button variant="ghost" onClick={() => setMobileMenuOpen(false)} className="p-1 text-black">
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <Link to="/properties?type=buy" className="block py-2 border-b text-black" onClick={() => setMobileMenuOpen(false)}>Buy</Link>
              <Link to="/properties?type=sell" className="block py-2 border-b text-black" onClick={() => setMobileMenuOpen(false)}>Sell</Link>
              <Link to="/properties?type=rent" className="block py-2 border-b text-black" onClick={() => setMobileMenuOpen(false)}>Rent</Link>
              <Link to="/contact" className="block py-2 border-b text-black" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link to="/request-listing" className="block py-2 border-b text-black" onClick={() => setMobileMenuOpen(false)}>Request Listing</Link>
              
              {user ? (
                <>
                  <div className="py-2 border-b text-black">
                    <p className="font-medium">{profile?.full_name || user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="block py-2 border-b text-black" onClick={() => setMobileMenuOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <Link to="/favorites" className="flex items-center py-2 border-b text-black" onClick={() => setMobileMenuOpen(false)}>
                    <Heart className="mr-2 h-4 w-4 text-red-500" />
                    Saved Properties
                  </Link>
                  
                  <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="flex items-center py-2 w-full text-left text-black">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/auth" className="block py-2 text-black" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
