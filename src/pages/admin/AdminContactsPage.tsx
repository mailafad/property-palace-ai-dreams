
import { useEffect, useState } from 'react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import {
  Search,
  MoreHorizontal,
  Eye,
  PhoneCall,
  Mail,
  CheckCircle,
  Clock,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  property_id?: string;
  property_title?: string;
  user_id?: string;
  status: string;
  notes?: string;
}

const AdminContactsPage = () => {
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredContacts, setFilteredContacts] = useState<ContactInquiry[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactInquiry | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchContacts = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select(`
          *,
          properties:property_id (
            title
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const formattedContacts = (data || []).map(contact => ({
        ...contact,
        property_title: contact.properties?.title || 'N/A'
      }));
      
      setContacts(formattedContacts);
      setFilteredContacts(formattedContacts);
    } catch (error: any) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contact inquiries');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    let filtered = contacts;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.property_title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredContacts(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, contacts]);

  const handleViewContact = (contact: ContactInquiry) => {
    setSelectedContact(contact);
    setNotes(contact.notes || '');
    setStatus(contact.status);
    setIsViewModalOpen(true);
  };

  const handleUpdateContact = async () => {
    if (!selectedContact) return;
    
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({
          status: status,
          notes: notes
        })
        .eq('id', selectedContact.id);
      
      if (error) throw error;
      
      toast.success('Contact inquiry updated successfully');
      fetchContacts();
      setIsViewModalOpen(false);
    } catch (error: any) {
      console.error('Error updating contact:', error);
      toast.error(error.message || 'Failed to update contact inquiry');
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, startIndex + itemsPerPage);

  const statusColors = {
    'new': 'text-blue-500',
    'contacted': 'text-yellow-500',
    'follow-up': 'text-purple-500',
    'resolved': 'text-green-500',
    'not-interested': 'text-red-500'
  };

  const statusIcons = {
    'new': <Clock className="h-4 w-4" />,
    'contacted': <PhoneCall className="h-4 w-4" />,
    'follow-up': <CalendarDays className="h-4 w-4" />,
    'resolved': <CheckCircle className="h-4 w-4" />,
    'not-interested': <MessageCircle className="h-4 w-4" />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Contact Inquiries</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="follow-up">Follow Up</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="not-interested">Not Interested</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedContacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No contact inquiries found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <div className="font-medium">{contact.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {contact.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <PhoneCall className="h-3 w-3 mr-1" />
                            {contact.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {contact.property_title}
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center ${statusColors[contact.status as keyof typeof statusColors]}`}>
                          {statusIcons[contact.status as keyof typeof statusIcons]}
                          <span className="ml-1 capitalize">{contact.status.replace('-', ' ')}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(contact.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewContact(contact)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a href={`mailto:${contact.email}`}>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a href={`tel:${contact.phone}`}>
                                <PhoneCall className="mr-2 h-4 w-4" />
                                Call
                              </a>
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
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredContacts.length)} of {filteredContacts.length} inquiries
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
      
      {/* View/Edit Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Contact Inquiry Details</DialogTitle>
            <DialogDescription>
              View and manage this contact inquiry
            </DialogDescription>
          </DialogHeader>
          
          {selectedContact && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{selectedContact.name}</h3>
                  <div className="space-y-1 mt-2">
                    <p className="text-sm flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${selectedContact.email}`} className="text-blue-500 hover:underline">
                        {selectedContact.email}
                      </a>
                    </p>
                    <p className="text-sm flex items-center">
                      <PhoneCall className="h-4 w-4 mr-2" />
                      <a href={`tel:${selectedContact.phone}`} className="text-blue-500 hover:underline">
                        {selectedContact.phone}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm"><span className="font-medium">Property:</span> {selectedContact.property_title}</p>
                  <p className="text-sm"><span className="font-medium">Date:</span> {new Date(selectedContact.created_at).toLocaleString()}</p>
                  <p className="text-sm flex items-center">
                    <span className="font-medium mr-2">Status:</span>
                    <span className={`capitalize ${statusColors[selectedContact.status as keyof typeof statusColors]}`}>
                      {statusIcons[selectedContact.status as keyof typeof statusIcons]}
                      <span className="ml-1">{selectedContact.status.replace('-', ' ')}</span>
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Message</h4>
                <div className="bg-gray-50 p-3 rounded-md text-sm">
                  {selectedContact.message}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Status</h4>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="follow-up">Follow Up</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="not-interested">Not Interested</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Notes</h4>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about the conversation or follow-up..."
                  rows={4}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsViewModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateContact}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContactsPage;
