import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdContacts } from "react-icons/io";
import Header from '../../CommonComponent/Header';
import { MdEmail } from 'react-icons/md';

const ContactTeam = () => {
    return (
        <div>
             <Header
                title="Contact"
                subTitle="Contact Our Active Team"
                details="At Medistore, your feedback is crucial to us. We are committed to providing the best products and services, and your suggestions help us do just that."
            />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mb-16   gap-4 mt-8'>
                 <div className='bg-first p-4 shadow-md rounded-sm shadow-first text-white text-center'>
                    <p className='flex justify-center'><FaLocationDot  size={40}/></p>
                 <h2 className='font-semibold pt-3 text-lg'> Head Office</h2>
                 <p className='text-gray-100'>Gulsan,Dhaka,Bangladesh</p>
                 </div>
                 <div className='bg-first p-4 shadow-md rounded-sm shadow-first text-white text-center'>
                    <p className='flex justify-center'><IoMdContacts size={40} /></p>
                 <h2 className='font-semibold pt-3 text-lg'>Hot Line</h2>
                 <p className='text-gray-100'>+9908484187</p>
                 </div>
                 <div className='bg-first p-4 shadow-md rounded-sm shadow-first text-white text-center'>
                    <p className='flex justify-center'><MdEmail  size={40}/></p>
                 <h2 className='font-semibold pt-3 text-lg'>Send Email</h2>
                 <p className='text-gray-100'>shawonahmed55660@gmail.com</p>
                 </div>
                
            </div>
            
        </div>
    );
};

export default ContactTeam;