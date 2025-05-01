import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  Plus,
  DollarSign,
  Users,
  LayoutGrid,
  Building,
  Eye
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';

const AdminDashboard = () => {
  const { properties } = useProperty();
  const { isAdmin } = useAuth();
  
  const forSaleCount = properties.filter(p => p.status === 'for-sale').length;
  const soldCount = properties.filter(p => p.status === 'sold').length;
  const pendingCount = properties.filter(p => p.status === 'pending').length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link to="/admin/properties/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Property
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Properties</CardDescription>
              <CardTitle className="text-3xl">{properties.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Building className="mr-1 h-4 w-4 text-primary" />
                  <span>All Listings</span>
                </div>
                <Link to="/admin/properties" className="text-primary hover:underline">View All</Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>For Sale</CardDescription>
              <CardTitle className="text-3xl">{forSaleCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Home className="mr-1 h-4 w-4 text-green-500" />
                  <span>Available</span>
                </div>
                <Link to="/admin/properties?status=for-sale" className="text-primary hover:underline">View All</Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Sold Properties</CardDescription>
              <CardTitle className="text-3xl">{soldCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-red-500" />
                  <span>Completed</span>
                </div>
                <Link to="/admin/properties?status=sold" className="text-primary hover:underline">View All</Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Sales</CardDescription>
              <CardTitle className="text-3xl">{pendingCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4 text-yellow-500" />
                  <span>In Progress</span>
                </div>
                <Link to="/admin/properties?status=pending" className="text-primary hover:underline">View All</Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Added Properties</CardTitle>
              <CardDescription>The latest properties added to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {properties.slice(0, 5).map(property => (
                  <div key={property.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded overflow-hidden mr-3">
                        <img 
                          src={property.images[0]} 
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <p className="text-sm text-muted-foreground">{property.address}, {property.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link to={`/property/${property.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/admin/properties/edit/${property.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link to="/admin/properties/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Property
                  </Button>
                </Link>
                <Link to="/admin/properties">
                  <Button variant="outline" className="w-full justify-start">
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    Manage Properties
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
