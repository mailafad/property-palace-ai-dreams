
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Home, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">AD Realestate</h3>
            <p className="text-gray-300 mb-4">Helping you find your dream home across India</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/properties" className="text-gray-300 hover:text-white">Properties</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link to="/auth" className="text-gray-300 hover:text-white">Sign In</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start text-gray-300">
                <MapPin className="h-5 w-5 mr-2 mt-1" />
                <span>No.1, Kalaignar Road<br/>Anna Nagar, Pammal<br/>Chennai-75</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91 9003111000</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@afglobalenterprises.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AD Realestate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
