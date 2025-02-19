import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">About Medistore</h2>
        <p className="mt-4 text-lg text-gray-600">
          Medistore is your trusted online pharmacy, offering high-quality medicines and healthcare products
          at affordable prices. Our mission is to provide convenient and reliable healthcare solutions to
          our customers.
        </p>
      </div>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800">100% Genuine Medicines</h3>
          <p className="text-gray-600 mt-2">We ensure that all our products are sourced from licensed manufacturers.</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Fast & Secure Delivery</h3>
          <p className="text-gray-600 mt-2">Get your medicines delivered quickly and safely to your doorstep.</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Customer Support</h3>
          <p className="text-gray-600 mt-2">We offer 24/7 support to assist you with your healthcare needs.</p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <h3 className="text-2xl font-bold text-gray-900">Why Choose Medistore?</h3>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
          At Medistore, we prioritize your health and convenience. With a user-friendly platform, verified medicines,
          and top-notch customer service, we ensure a seamless experience for all your healthcare needs.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Easy Prescription Upload</h3>
          <p className="text-gray-600 mt-2">Upload prescriptions hassle-free and get medicines delivered to your home.</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Secure Payment Options</h3>
          <p className="text-gray-600 mt-2">We support multiple payment methods for a seamless transaction experience.</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Health & Wellness Tips</h3>
          <p className="text-gray-600 mt-2">Get expert tips and articles to maintain a healthy lifestyle.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
