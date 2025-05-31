import React from "react";
import Header from "./Header";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 pb-12 px-4 sm:px-6 lg:px-8">
     
        <Header
       
        subTitle="About Medistore"
        details="Medistore is your trusted online pharmacy, offering high-quality medicines and healthcare products
          at affordable prices. Our mission is to provide convenient and reliable healthcare solutions to
          our customers."
      />
      
      <div className="mt-10 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-second  shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold dark:text-white  text-gray-800">100% Genuine Medicines</h3>
          <p className="text-gray-600 dark:text-gray-200 mt-2">We ensure that all our products are sourced from licensed manufacturers.</p>
        </div>

        <div className="bg-white dark:bg-second shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold dark:text-white text-gray-800">Fast & Secure Delivery</h3>
          <p className="text-gray-600 dark:text-gray-200 mt-2">Get your medicines delivered quickly and safely to your doorstep.</p>
        </div>

        <div className="bg-white dark:bg-second shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold dark:text-white text-gray-800">Customer Support</h3>
          <p className="text-gray-600 dark:text-gray-200 mt-2">We offer 24/7 support to assist you with your healthcare needs.</p>
        </div>
      </div>

        <Header
      
        subTitle="Why Choose Medistore?"
        details="At Medistore, we prioritize your health and convenience. With a user-friendly platform, verified medicines,
          and top-notch customer service, we ensure a seamless experience for all your healthcare needs."
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       

        <div className="bg-white dark:bg-second shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold dark:text-white text-gray-800">Easy Prescription Upload</h3>
          <p className="text-gray-600 dark:text-gray-200 mt-2">Upload prescriptions hassle-free and get medicines delivered to your home.</p>
        </div>

        <div className="bg-white dark:bg-second shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold dark:text-white text-gray-800">Secure Payment Options</h3>
          <p className="text-gray-600 dark:text-gray-200 mt-2">We support multiple payment methods for a seamless transaction experience.</p>
        </div>

        <div className="bg-white dark:bg-second shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold dark:text-white text-gray-800">Health & Wellness Tips</h3>
          <p className="text-gray-600 dark:text-gray-200 mt-2">Get expert tips and articles to maintain a healthy lifestyle.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
