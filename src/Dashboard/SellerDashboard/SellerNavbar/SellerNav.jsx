import React from 'react';
import { FaCcAmazonPay, FaSellsy } from 'react-icons/fa';
import { GiMedicines } from "react-icons/gi";
import { RiAdvertisementFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const SellerNav = () => {


    return (
        <div>
             <ul className='font-semibold'>   
                {/* <li  className=' my-4' ><NavLink className='px-2 flex items-center justify-end gap-2  py-2' to='/dashboard/bannarAdvertise'></NavLink></li> */}
                <li className=' my-4'><NavLink className='px-2 capitalize  flex items-center justify-end gap-2  py-2' to='/dashboard/sellerHome'end ><span>seller home</span><FaSellsy size={30} /></NavLink></li>
                <li className=' my-4'><NavLink className='px-2 capitalize  flex items-center justify-end gap-2  py-2' to='/dashboard/manageMedicines'> <span>Manage Medicines</span><GiMedicines size={30} /></NavLink></li>
                 <li className=' my-4'><NavLink className='px-2 capitalize  flex items-center justify-end gap-2  py-2' to='/dashboard/paymentHistory'><span>Payment History</span><FaCcAmazonPay size={27} /></NavLink></li>
                 <li className=' my-4'><NavLink className='px-2 capitalize  flex items-center justify-end gap-2  py-2' to='/dashboard/askForAdvertise'><span>Ask For Advertisment </span><RiAdvertisementFill size={30} /></NavLink></li>
                   
               
            </ul>
           

        </div>
    );
};

export default SellerNav;