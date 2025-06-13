export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-[#a5ff03]">Ad</span> REAL Estates
            </h3>
            <p>India's premier real estate platform connecting buyers and sellers.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#a5ff03]">Home</a></li>
              <li><a href="#" className="hover:text-[#a5ff03]">Properties</a></li>
              <li><a href="/aboutus" className="hover:text-[#a5ff03]">About us</a></li>
              <li><a href="#" className="hover:text-[#a5ff03]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li><i className="fas fa-phone text-[#a5ff03] mr-2"></i> +91 97908 42020</li>
              <li><i className="fas fa-envelope text-[#a5ff03] mr-2"></i> mailafad2k25@gmail.com</li>
              <li><i className="fas fa-map-marker-alt text-[#a5ff03] mr-2"></i> <span>No.1, Kalaignar Street<br />Anna Nagar, Pammal<br />Chennai-75</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1FYWhK687R/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#a5ff03]"><i className="fab fa-facebook"></i></a>
              <a href="https://www.instagram.com/adrealestate20?igsh=YjcyZzg0MWE3MzR6" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#a5ff03]"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>
            &copy; 2025 Ad REAL Estates. All rights reserved.
            <span style={{ color: "#09e65e" }}> Powered by Growt</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

