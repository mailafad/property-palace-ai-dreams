
import { Home, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-footer-bg text-footer-text py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Home className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold">PropertyPalace</span>
            </div>
            <p className="text-footer-link-base mb-4">
              Finding your dream property has never been easier with our AI-powered real estate platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-footer-link-base hover:text-footer-link-hover">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-footer-link-base hover:text-footer-link-hover">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-footer-link-base hover:text-footer-link-hover">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-footer-link-base hover:text-footer-link-hover">Home</Link></li>
              <li><Link to="/properties" className="text-footer-link-base hover:text-footer-link-hover">Properties</Link></li>
              <li><Link to="/contact" className="text-footer-link-base hover:text-footer-link-hover">Contact</Link></li>
              <li><Link to="/admin" className="text-footer-link-base hover:text-footer-link-hover">Admin</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li><Link to="/properties?type=house" className="text-footer-link-base hover:text-footer-link-hover">Houses</Link></li>
              <li><Link to="/properties?type=apartment" className="text-footer-link-base hover:text-footer-link-hover">Apartments</Link></li>
              <li><Link to="/properties?type=condo" className="text-footer-link-base hover:text-footer-link-hover">Condos</Link></li>
              <li><Link to="/properties?type=villa" className="text-footer-link-base hover:text-footer-link-hover">Villas</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-footer-link-base">(123) 456-7890</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-footer-link-base">info@propertypalace.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Home className="h-5 w-5 text-primary" />
                <span className="text-footer-link-base">123 Real Estate St, Property City, PC 12345</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-footer-link-base">
          <p>&copy; {new Date().getFullYear()} PropertyPalace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
