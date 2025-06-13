import React from "react";

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#a5ff03]">AD REAL ESTATE</h1>
          <p className="text-xl font-semibold text-gray-700">Add value to your real estate</p>
        </div>
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Story</h2>
          <p className="mb-4">
            Founded by <span className="font-semibold">Hufaizullah</span> (Founder/CEO), AD Real Estate is dedicated to providing perfect solutions for quality-seeking clients of all kinds. Upholding the AF group's credibility, AD Real Estate has carved a niche in the crowded real estate market.
          </p>
          <p className="mb-4">
            We specialize in buying and selling residential, commercial, and industrial properties of various sizes. By understanding our clients' unique needs, we deliver services with a high degree of professionalism and integrity.
          </p>
          <p className="mb-4">
            Our customer-centric approach and unwavering integrity have resulted in numerous successful deals and a growing list of happy, satisfied clients. Since November 2022, under the AF Global Enterprises brand, we have consolidated all group companies to provide seamless, trustworthy real estate services.
          </p>
        </div>
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Why Choose Us?</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Over 100+ successful property deals closed with happy clients.</li>
            <li>Expertise in residential, commercial, and industrial real estate.</li>
            <li>Personalized service tailored to each client's needs.</li>
            <li>Transparent processes and ethical business practices.</li>
            <li>Strong reputation built on trust and client satisfaction.</li>
            <li>Professional team led by industry experts.</li>
          </ul>
        </div>
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Clients Say</h2>
          <div className="space-y-6">
            <div>
              <p className="italic">"AD Real Estate made my first home purchase smooth and stress-free. Highly recommended!"</p>
              <span className="block mt-2 font-semibold text-[#a5ff03]">— Satisfied Home Buyer</span>
            </div>
            <div>
              <p className="italic">"Professional, transparent, and always available. Our commercial property deal was handled perfectly."</p>
              <span className="block mt-2 font-semibold text-[#a5ff03]">— Business Owner</span>
            </div>
            <div>
              <p className="italic">"Their team truly understands client needs and delivers beyond expectations."</p>
              <span className="block mt-2 font-semibold text-[#a5ff03]">— Happy Investor</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <span className="text-lg font-semibold text-gray-700">Contact us today and become a part of our growing family of happy clients!</span>
        </div>
      </div>
    </div>
  );
}