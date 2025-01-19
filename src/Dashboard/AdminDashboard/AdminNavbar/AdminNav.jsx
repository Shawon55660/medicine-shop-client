import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
    return (
        <div>
            <ul>
            <li><NavLink to='/dashboard/AdminHome' end>Admin Home</NavLink></li>
            <li><NavLink to='/dashboard/users'>Manage Users</NavLink></li>
                <li><NavLink to='/dashboard/manageCategory'>Manage Category</NavLink></li>
                <li><NavLink to='/dashboard/paymentManagement'>Payment Management</NavLink></li>
                <li><NavLink to='/dashboard/salesReport'>Sales Report</NavLink></li>
                <li><NavLink to='/dashboard/bannarAdvertise'>Bannar  Advertisement</NavLink></li>
            </ul>
            
        </div>
    );
};

export default AdminNav;