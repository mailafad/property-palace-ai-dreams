
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import AdminHeader from '@/components/admin/AdminHeader';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';
import { 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  Eye,
  Search, 
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ListingRequest {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: string;
  created_at: string;
  user_id: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  description: string;
  type: string;
  zip_code?: string;
  year_built?: number;
}

const AdminListingRequestsPage = () => {
  const navigate = useNavigate();
  const [listingRequests, setListingRequests] = useState<ListingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRequests, setFilteredRequests] = useState<ListingRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ListingRequest | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchListingRequests = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('listing_requests')
        .select('*')
        .order('created_at', { ascending: false });
      console.log('Fetched listing requests:', data);
      
      if (error) throw error;
      
      setListingRequests(data || []);
      setFilteredRequests(data || []);
    } catch (error: any) {
      console.error('Error fetching listing requests:', error);
      toast.error('Failed to load listing requests');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListingRequests();
  }, []);

  useEffect(() => {
    const filtered = listingRequests.filter(request => 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.contact_email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRequests(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, listingRequests]);

  const handleViewRequest = (request: ListingRequest) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };

  const handleApprove = async (id: string) => {
    try {
      // Get the request data
      const request = listingRequests.find(r => r.id === id);
      if (!request) return;
      
      // Create a property from the request
      const { error: propertyError } = await supabase
        .from('properties')
        .insert({
          title: request.title,
          price: request.price,
          address: request.address,
          city: request.city,
          state: request.state,
          zip_code: request.zip_code || '',
          bedrooms: request.bedrooms,
          bathrooms: request.bathrooms,
          area: request.area,
          year_built: request.year_built || 2000,
          description: request.description,
          type: request.type,
          status: 'for-sale',
          features: {},
          images: []
        });
      
      if (propertyError) throw propertyError;
      
      // Update the listing request status
      const { error: updateError } = await supabase
        .from('listing_requests')
        .update({ status: 'approved' })
        .eq('id', id);
      
      if (updateError) throw updateError;
      
      toast.success('Listing request approved and property created');
      fetchListingRequests();
    } catch (error: any) {
      console.error('Error approving listing request:', error);
      toast.error(error.message || 'Failed to approve listing request');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('listing_requests')
        .update({ status: 'rejected' })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Listing request rejected');
      fetchListingRequests();
    } catch (error: any) {
      console.error('Error rejecting listing request:', error);
      toast.error(error.message || 'Failed to reject listing request');
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const statusColors = {
    'pending': 'bg-yellow-500',
    'approved': 'bg-green-500',
    'rejected': 'bg-red-500'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Listing Requests</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search listing requests..."
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
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No listing requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{request.title}</p>
                          <p className="text-sm text-muted-foreground">{request.type}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {request.city}, {request.state}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(request.price)}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{request.contact_name}</p>
                        <p className="text-xs text-muted-foreground">{request.contact_email}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`${statusColors[request.status as keyof typeof statusColors]} text-white`}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(request.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewRequest(request)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {request.status === 'pending' && (
                              <>
                                <DropdownMenuItem onClick={() => handleApprove(request.id)}>
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleReject(request.id)}>
                                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
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
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
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
      
      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Listing Request Details</DialogTitle>
            <DialogDescription>
              Review the details of this listing request
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{selectedRequest.title}</h3>
                  <p className="text-muted-foreground">{selectedRequest.address}, {selectedRequest.city}, {selectedRequest.state}</p>
                  <p className="text-xl font-bold mt-2">{formatCurrency(selectedRequest.price)}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm"><span className="font-medium">Status:</span> {selectedRequest.status}</p>
                  <p className="text-sm"><span className="font-medium">Type:</span> {selectedRequest.type}</p>
                  <p className="text-sm"><span className="font-medium">Date:</span> {new Date(selectedRequest.created_at).toLocaleString()}</p>
                </div>
              </div>
              
              <hr />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Property Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><span className="font-medium">Bedrooms:</span> {selectedRequest.bedrooms}</p>
                    <p><span className="font-medium">Bathrooms:</span> {selectedRequest.bathrooms}</p>
                    <p><span className="font-medium">Area:</span> {selectedRequest.area} sqft</p>
                    <p><span className="font-medium">Year Built:</span> {selectedRequest.year_built || 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <p className="text-sm"><span className="font-medium">Name:</span> {selectedRequest.contact_name}</p>
                  <p className="text-sm"><span className="font-medium">Email:</span> {selectedRequest.contact_email}</p>
                  <p className="text-sm"><span className="font-medium">Phone:</span> {selectedRequest.contact_phone || 'N/A'}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm">{selectedRequest.description}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {selectedRequest && selectedRequest.status === 'pending' && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleReject(selectedRequest.id);
                    setIsViewModalOpen(false);
                  }}
                  className="text-red-500"
                >
                  Reject
                </Button>
                <Button 
                  onClick={() => {
                    handleApprove(selectedRequest.id);
                    setIsViewModalOpen(false);
                  }}
                >
                  Approve
                </Button>
              </>
            )}
            <Button 
              variant="secondary" 
              onClick={() => setIsViewModalOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminListingRequestsPage;
