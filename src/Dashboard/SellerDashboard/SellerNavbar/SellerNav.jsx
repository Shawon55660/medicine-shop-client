import React from 'react';
import { NavLink } from 'react-router-dom';

const SellerNav = () => {


    return (
        <div>
             <ul>
                <li className=' my-3'><NavLink className='px-1  py-1' to='/dashboard/sellerHome'end >Seller Home</NavLink></li>
                <li className=' my-3'><NavLink className='px-1  py-1' to='/dashboard/manageMedicines'>Manage Medicines</NavLink></li>
                 <li className=' my-3'><NavLink className='px-1  py-1' to='/dashboard/paymentHistory'>Payment History</NavLink></li>
                 <li className=' my-3'><NavLink className='px-1  py-1' to='/dashboard/askForAdvertise'>Ask For Advertisment</NavLink></li>
               
            </ul>
            
        </div>
    );
};

export default SellerNav;