import React from 'react';
import { MdPayments } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const UserNav = () => {
    return (
        <div>
            <ul>
             
                 <li className=' my-4'><NavLink className='px-2 flex items-start font-semibold uppercase justify-end gap-3  py-2'  to='/dashboard/payment' end><span>Payment History </span><MdPayments  size={25}/></NavLink></li>
                
               
            </ul>
            
        </div>
    );
};

export default UserNav;