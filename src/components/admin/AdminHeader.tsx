
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const AdminHeader = () => {
  const { signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-black text-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/admin/dashboard" className="text-xl font-bold flex items-center">
            <span className="text-primary mr-2">AD</span> Admin
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link to="/admin/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              <Link to="/admin/properties" className="hover:text-primary transition-colors">Properties</Link>
              <Link to="/admin/listing-requests" className="hover:text-primary transition-colors">Listing Requests</Link>
              <Link to="/admin/contacts" className="hover:text-primary transition-colors">Contact Inquiries</Link>
            </nav>
            
            <div className="flex items-center space-x-4 border-l pl-6">
              <Link to="/" className="text-sm hover:text-primary transition-colors">
                View Site
              </Link>
              <Button variant="outline" size="sm" onClick={signOut} className="text-white border-white hover:bg-white/10">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(true)} className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="bg-white h-full w-64 p-6 text-black">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Admin Menu</h2>
              <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="space-y-4">
              <Link to="/admin/dashboard" className="block py-2 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/admin/properties" className="block py-2 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                Properties
              </Link>
              <Link to="/admin/listing-requests" className="block py-2 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                Listing Requests
              </Link>
              <Link to="/admin/contacts" className="block py-2 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                Contact Inquiries
              </Link>
              <div className="border-t pt-4 mt-4">
                <Link to="/" className="block py-2 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  View Site
                </Link>
                <button 
                  onClick={() => { signOut(); setMobileMenuOpen(false); }} 
                  className="w-full text-left py-2 text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
