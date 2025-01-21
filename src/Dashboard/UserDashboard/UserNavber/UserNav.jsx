import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNav = () => {
    return (
        <div>
            <ul>
            
                 <li className=' my-3'><NavLink className='px-1  py-1'  to='/dashboard/payment' end>Payment History</NavLink></li>
                
               
            </ul>
            
        </div>
    );
};

export default UserNav;