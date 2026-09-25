import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PropertyProvider } from "@/contexts/PropertyContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";

// Load route-specific code only when a route is visited.
const Index = lazy(() => import("./pages/Index"));
const PropertiesPage = lazy(() => import("./pages/PropertiesPage"));
const PropertyDetailPage = lazy(() => import("./pages/PropertyDetailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const AdminDashboard = lazy(() => import("./pages/admin"));
const AdminPropertiesPage = lazy(() => import("./pages/admin/AdminPropertiesPage"));
const PropertyFormPage = lazy(() => import("./pages/admin/PropertyFormPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const RequestListingPage = lazy(() => import("./pages/RequestListingPage"));
const AdminListingRequestsPage = lazy(() => import("./pages/admin/AdminListingRequestsPage"));
const AdminContactsPage = lazy(() => import("./pages/admin/AdminContactsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
                <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
                  <AppRoutes />
                </Suspense>
              </TooltipProvider>
            </PropertyProvider>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  </>
);

export default App;
