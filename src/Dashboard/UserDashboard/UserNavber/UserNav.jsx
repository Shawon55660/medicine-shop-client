import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNav = () => {
    return (
        <div>
            <ul>
            
                <li><NavLink  to='/dashboard/UserPaymentHistory'>Payment History</NavLink></li>
                
               
            </ul>
            
        </div>
    );
};

export default UserNav;