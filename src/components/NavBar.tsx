
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Home, User, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
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
    <nav className="bg-nav-bg shadow-sm py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-nav-text">PropertyPalace</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-nav-text hover:text-primary">Home</Link>
          <Link to="/properties" className="text-nav-text hover:text-primary">Properties</Link>
          <Link to="/contact" className="text-nav-text hover:text-primary">Contact</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {!isMobile && (
            <Link to="/properties">
              <Button variant="outline" size="sm" className="flex items-center text-nav-text border-nav-text hover:bg-hover-bg hover:text-primary">
                <Search className="h-4 w-4 mr-2" />
                Search Properties
              </Button>
            </Link>
          )}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-nav-text hover:bg-hover-bg hover:text-primary">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="text-nav-text hover:bg-hover-bg hover:text-primary">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
