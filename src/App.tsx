import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PropertyProvider } from "@/contexts/PropertyContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";

// Pages
import Index from "./pages/Index";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import ContactPage from "./pages/ContactPage";
import AboutUs from "./pages/AboutUs";
import AuthPage from "./pages/AuthPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/admin";
import AdminPropertiesPage from "./pages/admin/AdminPropertiesPage";
import PropertyFormPage from "./pages/admin/PropertyFormPage";
import FavoritesPage from "./pages/FavoritesPage";
import RequestListingPage from "./pages/RequestListingPage";
import AdminListingRequestsPage from "./pages/admin/AdminListingRequestsPage";
import AdminContactsPage from "./pages/admin/AdminContactsPage";
import NotFound from "./pages/NotFound";
import PropMateChatWidget from "./components/PropMateChatWidget";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

// Protected route component with improved loading state
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-3">Loading your account...</p>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

// Admin route component with improved loading state
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-3">Verifying admin access...</p>
      </div>
    );
  }
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Index />} />
    <Route path="/properties" element={<PropertiesPage />} />
    <Route path="/property/:id" element={<PropertyDetailPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/aboutus" element={<AboutUs />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/request-listing" element={<RequestListingPage />} />
    
    {/* Protected Routes */}
    <Route path="/favorites" element={
      <ProtectedRoute>
        <FavoritesPage />
      </ProtectedRoute>
    } />
    
    {/* Admin Routes */}
    <Route path="/admin" element={<AdminLoginPage />} />
    <Route path="/admin/dashboard" element={
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    } />
    <Route path="/admin/properties" element={
      <AdminRoute>
        <AdminPropertiesPage />
      </AdminRoute>
    } />
    <Route path="/admin/properties/new" element={
      <AdminRoute>
        <PropertyFormPage />
      </AdminRoute>
    } />
    <Route path="/admin/properties/edit/:id" element={
      <AdminRoute>
        <PropertyFormPage />
      </AdminRoute>
    } />
    <Route path="/admin/listing-requests" element={
      <AdminRoute>
        <AdminListingRequestsPage />
      </AdminRoute>
    } />
    <Route path="/admin/contacts" element={
      <AdminRoute>
        <AdminContactsPage />
      </AdminRoute>
    } />
    
    {/* 404 Route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <PropertyProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <AppRoutes />
              </TooltipProvider>
            </PropertyProvider>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
    <PropMateChatWidget />
  </>
);

export default App;
