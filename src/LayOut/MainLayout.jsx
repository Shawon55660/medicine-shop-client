import React from 'react';
import Navbar from '../CommonComponent/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='max-w-screen-2xl  mx-auto'>
            <Navbar></Navbar>
            <div className='min-h-screen'>
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default MainLayout;