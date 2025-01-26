import React from 'react';
import Header from '../../CommonComponent/Header';

const ClientReviews = () => {
    return (
        <div className="bg-third p-6">
            {/* Header Section */}
            <Header
                title="Feedback"
                subTitle="We Value Your Feedback"
                details="At Medistore, your feedback is crucial to us. We are committed to providing the best products and services, and your suggestions help us do just that. Whether it’s about your shopping experience, product quality, or service, we want to hear from you"
            />

            {/* Form Section */}
          <div className='md:w-7/12 mx-auto'>
          <form className="mt-6 flex flex-col">
                <textarea
                    className=" w-full mx-auto p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-first"
                    placeholder="Your experience"
                    rows="4"
                ></textarea>
                <button
                    type="submit"
                    className="mt-4 w-[100px] px-6 py-2 text-white bg-first rounded-sm hover:bg-first-dark transition"
                >
                    Submit
                </button>
            </form>
          </div>
        </div>
    );
};

export default ClientReviews;
