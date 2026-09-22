
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { useProperty } from '@/contexts/PropertyContext';
import { formatPropertyPrice } from '@/lib/utils';
import { 
  Plus, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye, 
  Search,
  ChevronLeft,
  ChevronRight, 
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AdminHeader from '@/components/admin/AdminHeader';

const AdminPropertiesPage = () => {
  const { properties, deleteProperty } = useProperty();
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, loading, navigate]);
  
  useEffect(() => {
    const filtered = properties.filter(property => 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, properties]);
  
  if (loading) return null;
  if (!isAdmin) return null;
  
  const statusColors = {
    'for-sale': 'bg-green-500',
    'for-rent': 'bg-blue-500',
    'sold': 'bg-red-500',
    'pending': 'bg-yellow-500'
  };
  
  const handleDeleteConfirm = () => {
    if (propertyToDelete) {
      deleteProperty(propertyToDelete);
      setPropertyToDelete(null);
    }
  };
  
  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Properties</h1>
          <Link to="/admin/properties/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Property
            </Button>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Listed Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProperties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No properties found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded overflow-hidden mr-3">
                            <img 
                              src={property.images[0]} 
                              alt={property.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{property.title}</p>
                            <p className="text-sm text-muted-foreground">ID: {property.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {property.city}, {property.state}
                      </TableCell>
                      <TableCell>
                        {formatPropertyPrice(property.price, property.priceUnit)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`${statusColors[property.status]} text-white`}>
                          {property.status.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(property.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/property/${property.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/properties/edit/${property.id}`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => setPropertyToDelete(property.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProperties.length)} of {filteredProperties.length} properties
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <AlertDialog open={!!propertyToDelete} onOpenChange={() => setPropertyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this property. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPropertiesPage;
