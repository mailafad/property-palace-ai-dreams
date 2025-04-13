
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import '@/styles/ad-realtor-styles.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const isMobile = useIsMobile();
  const { user, profile, signOut, isAdmin } = useAuth();

  return (
    <nav className="navbar shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <i className="fas fa-home text-primary text-2xl mr-2"></i>
              <Link to="/" className="text-xl font-bold brand">AD Realestate</Link>
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <Link to="/properties?type=buy" className="nav-item px-3 py-2 text-sm font-medium">Buy</Link>
            <Link to="/properties?type=sell" className="nav-item px-3 py-2 text-sm font-medium">Sell</Link>
            <Link to="/properties?type=rent" className="nav-item px-3 py-2 text-sm font-medium">Rent</Link>
            <Link to="/contact" className="nav-item px-3 py-2 text-sm font-medium">Contact</Link>
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
                    <Link to="/favorites" className="cursor-pointer w-full">
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
