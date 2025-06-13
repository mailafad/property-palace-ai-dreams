import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <>
      <NavBar />
      <div className="bg-gradient-to-b from-[#f8fff0] to-white min-h-screen text-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-[#a5ff03] drop-shadow-lg">AD REAL ESTATE</h1>
            <p className="text-2xl font-semibold text-gray-700 mb-4">Add value to your real estate</p>
            <span className="inline-block bg-[#a5ff03] text-black px-4 py-1 rounded-full font-bold shadow">Trusted by 100+ Happy Clients</span>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#a5ff03]">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Story</h2>
              <p className="mb-4">
                Founded by <span className="font-semibold">Hufaizullah</span> (Founder/CEO), AD Real Estate is dedicated to providing perfect solutions for quality-seeking clients of all kinds. Upholding the AF group's credibility, AD Real Estate has carved a niche in the crowded real estate market.
              </p>
              <p className="mb-4">
                We specialize in buying and selling residential, commercial, and industrial properties of various sizes. By understanding our clients' unique needs, we deliver services with a high degree of professionalism and integrity.
              </p>
              <p>
                Our customer-centric approach and unwavering integrity have resulted in numerous successful deals and a growing list of happy, satisfied clients. Since November 2022, under the AF Global Enterprises brand, we have consolidated all group companies to provide seamless, trustworthy real estate services.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center bg-[#f6fff0] rounded-xl shadow p-8">
              <img src="/logo.png" alt="AD Real Estate Logo" className="h-24 w-24 mb-4 rounded-full shadow-lg border-4 border-[#a5ff03]" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Hufaizullah</h3>
              <span className="text-gray-600 mb-2">Founder / CEO</span>
              <span className="bg-[#a5ff03] text-black px-3 py-1 rounded-full font-semibold">AF Global Enterprises</span>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-[#a5ff03]">
                <i className="fas fa-handshake text-4xl text-[#a5ff03] mb-3"></i>
                <span className="font-bold text-lg mb-2 text-gray-800">100+ Happy Clients</span>
                <p className="text-center text-gray-600 text-sm">Over 100+ successful property deals closed with happy clients.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-[#a5ff03]">
                <i className="fas fa-building text-4xl text-[#a5ff03] mb-3"></i>
                <span className="font-bold text-lg mb-2 text-gray-800">All Property Types</span>
                <p className="text-center text-gray-600 text-sm">Expertise in residential, commercial, and industrial real estate.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-[#a5ff03]">
                <i className="fas fa-user-check text-4xl text-[#a5ff03] mb-3"></i>
                <span className="font-bold text-lg mb-2 text-gray-800">Personalized Service</span>
                <p className="text-center text-gray-600 text-sm">Personalized service tailored to each client's needs.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-[#a5ff03]">
                <i className="fas fa-balance-scale text-4xl text-[#a5ff03] mb-3"></i>
                <span className="font-bold text-lg mb-2 text-gray-800">Transparent & Ethical</span>
                <p className="text-center text-gray-600 text-sm">Transparent processes and ethical business practices.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-[#a5ff03]">
                <i className="fas fa-star text-4xl text-[#a5ff03] mb-3"></i>
                <span className="font-bold text-lg mb-2 text-gray-800">Trusted Reputation</span>
                <p className="text-center text-gray-600 text-sm">Strong reputation built on trust and client satisfaction.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-[#a5ff03]">
                <i className="fas fa-users text-4xl text-[#a5ff03] mb-3"></i>
                <span className="font-bold text-lg mb-2 text-gray-800">Expert Team</span>
                <p className="text-center text-gray-600 text-sm">Professional team led by industry experts.</p>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 mb-12 border-l-4 border-[#a5ff03]">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Clients Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#f8fff0] rounded-lg p-4 shadow">
                <p className="italic">"AD Real Estate made my first home purchase smooth and stress-free. Highly recommended!"</p>
                <span className="block mt-2 font-semibold text-[#a5ff03]">— Satisfied Home Buyer</span>
              </div>
              <div className="bg-[#f8fff0] rounded-lg p-4 shadow">
                <p className="italic">"Professional, transparent, and always available. Our commercial property deal was handled perfectly."</p>
                <span className="block mt-2 font-semibold text-[#a5ff03]">— Business Owner</span>
              </div>
              <div className="bg-[#f8fff0] rounded-lg p-4 shadow">
                <p className="italic">"Their team truly understands client needs and delivers beyond expectations."</p>
                <span className="block mt-2 font-semibold text-[#a5ff03]">— Happy Investor</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <span className="text-lg font-semibold text-gray-700">Contact us today and become a part of our growing family of happy clients!</span>
          </div>
          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Follow Us</h2>
            <div className="flex justify-center space-x-6">
              <a href="https://www.facebook.com/share/1FYWhK687R/" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-[#a5ff03]">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/adrealestate20?igsh=YjcyZzg0MWE3MzR6" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-[#a5ff03]">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}