import React from 'react';
import { FaAmazonPay } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const UserNav = () => {
    return (
        <div>
            <ul>
             
                 <li className=' my-4'><NavLink className='px-2 flex items-start justify-end gap-2  py-2'  to='/dashboard/payment' end><span>Payment History </span><FaAmazonPay  size={30}/></NavLink></li>
                
               
            </ul>
            
        </div>
    );
};

export default UserNav;