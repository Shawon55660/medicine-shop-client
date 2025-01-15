import React from 'react';
import { NavLink } from 'react-router-dom';

const SellerNav = () => {


    return (
        <div>
             <ul>
               <li><NavLink to='/dashboard'end >Seller Home</NavLink></li>
               <li><NavLink to='/dashboard/manageMedicines'>Manage Medicines</NavLink></li>
                <li><NavLink to='/dashboard/paymentHistory'>Payment History</NavLink></li>
                <li><NavLink to='/dashboard/askForAdvertise'>Ask For Advertisment</NavLink></li>
               
            </ul>
            
        </div>
    );
};

export default SellerNav;