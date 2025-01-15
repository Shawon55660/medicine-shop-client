import React from 'react';
import AdminNav from './AdminDashboard/AdminNavbar/AdminNav';
import { NavLink, Outlet } from 'react-router-dom';
import SellerNav from './SellerDashboard/SellerNavbar/SellerNav';
import UserNav from './UserDashboard/UserNavber/UserNav';
import useRole from '../CustomHook/useRole';


const DashboardLayout = () => {
    const [role,isLoading] = useRole()
    
   
    return (
        <div className='grid grid-cols-8 min-h-screen max-w-screen-2xl  mx-auto'>
            <div className='col-span-2 bg-red-400'>
            
                {role === 'admin' && <AdminNav></AdminNav>}
                {role === 'seller' && <SellerNav></SellerNav>}
                {role === 'user' && <UserNav></UserNav>}
                
          

            </div>
            <div className='col-span-6 bg-yellow-300'>
                <Outlet>

                </Outlet>

            </div>

        </div>
    );
};

export default DashboardLayout;