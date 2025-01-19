import React from 'react';
import AdminNav from './AdminDashboard/AdminNavbar/AdminNav';
import { NavLink, Outlet } from 'react-router-dom';
import SellerNav from './SellerDashboard/SellerNavbar/SellerNav';
import UserNav from './UserDashboard/UserNavber/UserNav';
import useRole from '../CustomHook/useRole';
import Loading from '../CommonComponent/Loading'
import AdminRouter from '../Routes/AdminRouter';
import SellerRouter from '../Routes/SellerRouter';


const DashboardLayout = () => {
    const [role,isLoading] = useRole()
    
    if(isLoading) return <Loading></Loading>
   
    return (
        <div className='grid grid-cols-10 min-h-screen max-w-screen-2xl  mx-auto'>
            <div className='col-span-2 bg-red-400'>
            
            
                {role === 'admin' && <AdminRouter><AdminNav></AdminNav></AdminRouter>}
                {role === 'seller' && <SellerRouter><SellerNav></SellerNav></SellerRouter>}
                {role === 'user' && <UserNav></UserNav>}
                
          

            </div>
            <div className='col-span-8 '>
                <Outlet>

                </Outlet>

            </div>

        </div>
    );
};

export default DashboardLayout;