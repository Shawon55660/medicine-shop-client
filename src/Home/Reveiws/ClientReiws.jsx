import React from 'react';
import Header from '../../CommonComponent/Header';
import useAuth from '../../CustomHook/useAuth';
import useAxiosPublic from '../../CustomHook/useAxiosPublic';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';

const ClientReviews = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
   
    const handleReveiw =async (e)=>{
        e.preventDefault()
        const form = e.target;
        const ClientReview = form.reveiw.value
        const clientName = user?.displayName
        const clientPhoto = user?.photoURL
        const reviewDate = new Date()
       const reviewDoc = {clientName,clientPhoto,ClientReview,reviewDate}
       const res = await axiosPublic.post('/clientReveiws',reviewDoc)
       if(res.data.acknowledged){
         toast.success("Thank you for your feedback", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        icon: <span style={{ color: "#85A844" }}> <img src="https://img.icons8.com/?size=100&id=59850&format=png&color=85A844" alt="" srcset="" /></span>,
                        style: { backgroundColor: "#FFFFF", color: "#85A844", fontWeight: "bold" },
                    });
        form.reset()
        navigate('/shop')
       }
       
    }
    return (
        <div className="bg-third p-6">
            {/* Header Section */}
            <Header
                title="Feedback"
                subTitle="We Value Your Feedback"
                details="At Medistore, your feedback is crucial to us. We are committed to providing the best products and services, and your suggestions help us do just that."
            />

            {/* Form Section */}
          <div className='md:w-7/12 mx-auto'>
          <form onSubmit={handleReveiw} className="mt-6 flex flex-col">
                <textarea
                    className=" w-full mx-auto p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-first"
                    placeholder="Your experience"
                    name='reveiw'
                    rows="4"
                    required
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
