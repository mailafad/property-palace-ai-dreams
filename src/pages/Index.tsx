
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PropertyList from '@/components/PropertyList';
import { Button } from '@/components/ui/button';
import { useProperty } from '@/contexts/PropertyContext';
import { Search, MapPin, Home, Building, CheckSquare } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Import the custom styles
import '@/styles/ad-realtor-styles.css';
import '@/styles/button-styles.css';

const Index = () => {
  const { properties } = useProperty();
  const featuredProperties = properties.filter(property => property.featured);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Helmet>
        <title>AD Realestate | Find Your Dream Home Today</title>
        <meta name="description" content="Browse thousands of properties across India. We make buying, selling, and renting easy with AD Realestate." />
        <meta name="keywords" content="real estate, property, India, buy home, sell home, rent property" />
        <meta property="og:title" content="AD Realestate | Find Your Dream Home" />
        <meta property="og:description" content="Find your perfect property with AD Realestate. Thousands of listings across India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adrealestate.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <NavBar />
      
      {/* Improved Hero Section with 3D-like effects and background image */}
      <section className="hero-section relative py-20 md:py-32 text-white flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920" 
          alt="Luxury home exterior" 
          className="hero-background"
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left hero-content">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl animate-fade-in max-w-3xl">
                Find Your Dream Home Today
              </h1>
              <p className="mt-6 text-xl text-white/90 max-w-3xl animate-fade-in">
                Browse thousands of properties across India. We make buying, selling, and renting easy.
              </p>
              <div className="mt-10 animate-fade-in w-full max-w-xl mx-auto md:mx-0">
                <div className="bg-white rounded-lg shadow-xl p-2 flex w-full">
                  <input 
                    type="text" 
                    placeholder="Search by city, neighborhood, or PIN code" 
                    className="flex-1 px-4 py-3 focus:outline-none text-black w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{caretColor: 'black'}}
                  />
                  <Link to={`/properties?search=${searchTerm}`}>
                    <button className="btn-premium px-6 py-3 font-medium ml-2">
                      <Search className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block hero-3d-element">
              <div className="floating-3d">
                <div className="relative">
                  {/* Modern house 3D model representation */}
                  <img 
                    src="https://images.unsplash.com/photo-1567496898669-ee935f5f647a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600" 
                    alt="Modern 3D House" 
                    className="rounded-lg shadow-2xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300 relative z-10"
                  />
                  
                  {/* Overlay elements to create 3D effect */}
                  <div className="absolute top-10 -right-8 transform rotate-6 scale-90 z-0">
                    <img 
                      src="https://images.unsplash.com/photo-1542889601-399c4f3a8402?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400" 
                      alt="Interior Design" 
                      className="rounded-lg shadow-xl opacity-60 w-32 h-32 object-cover"
                    />
                  </div>
                  
                  <div className="absolute -bottom-8 -left-8 transform -rotate-6 scale-75 z-0">
                    <img 
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400" 
                      alt="Modern Architecture" 
                      className="rounded-lg shadow-xl opacity-60 w-32 h-32 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Properties</h2>
              <p className="text-muted-foreground mt-1">Explore our handpicked selection of premium listings</p>
            </div>
            <Link to="/properties">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <PropertyList properties={featuredProperties} />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Why Choose Us</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              We combine cutting-edge technology with personalized service to make your property search easier than ever
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-muted-foreground">
                Our advanced search tools help you find exactly what you're looking for in seconds.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Property Insights</h3>
              <p className="text-muted-foreground">
                Get detailed AI-generated descriptions that highlight the unique features of each property.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                <CheckSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-muted-foreground">
                All our properties are verified and regularly updated to ensure accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Property Selling Section - New from custom template */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Have a property to sell?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            List your property & connect with clients faster!
          </p>
          <Link to="/contact">
            <button className="btn-premium px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
              Sell Your Property Now
            </button>
          </Link>
        </div>
      </section>
      
      {/* AF Global Section - New from custom template */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-12 flex justify-center items-center space-x-6">
            <img src="https://www.afglobalenterprises.com/images/logoh1.jpg" alt="AF Global Logo" className="h-16" />
            <span className="text-gray-1000 text-xl font-medium">Part of AF Global Enterprises</span>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Modified from original */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
              <p className="text-white/90 mb-6">
                Our experts are ready to help you through every step of your property journey in India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/properties">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Start Searching
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white/20">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600" 
                alt="Modern Home in India" 
                className="rounded-lg shadow-lg w-full h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
