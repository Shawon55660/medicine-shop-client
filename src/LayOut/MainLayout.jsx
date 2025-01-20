import React, { useState } from 'react';
import Navbar from '../CommonComponent/Navbar';
import { Outlet } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { IoMdClose } from "react-icons/io";
import Category from '../Home/Category/Category';
import Footer from '../CommonComponent/Footer';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className='container relative  mx-auto'>
            <Navbar></Navbar>


            <div className='lg:grid lg:grid-cols-12 gap-2  min-h-screen mt-16'>
                <button
                    className=" text-2xl text-white  p-2 m-3 fixed left-0 top-0 z-50 rounded-lg lg:hidden"
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ?<IoMdClose ></IoMdClose> : <IoMenu></IoMenu>  }
                </button>



              <div className='col-span-3 relative z-40  w-72 '>
              <div className={` shadow-xl rounded-sm text-black  h-screen    p-2 fixed top-18 lg:top-16 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 lg:fixed overflow-y-auto    z-40   transition-transform duration-300  `}>
                        <Category></Category>
                       




                </div>
              </div>

                <div className='col-span-9 w-full md:w-[96%]  '>
                    <div className='min-h-[80vh]'><Outlet></Outlet> </div>
                
             
              <Footer></Footer>
              
                </div>
                
            </div>
           


        </div>
    );
};

export default MainLayout;