import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import AdminNav from "./AdminDashboard/AdminNavbar/AdminNav";
import SellerNav from "./SellerDashboard/SellerNavbar/SellerNav";
import UserNav from "./UserDashboard/UserNavber/UserNav";
import useRole from "../CustomHook/useRole";
import Loading from "../CommonComponent/Loading";
import AdminRouter from "../Routes/AdminRouter";
import SellerRouter from "../Routes/SellerRouter";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import useAuth from "../CustomHook/useAuth";
import { IoHomeOutline } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const [role, isLoading] = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user,loading ,logOut} = useAuth();
  const handleLogOut= ()=>{
    logOut()
    .then(res=>{
      return Swal.fire({
        title: "LogOut!",
        text: "Logout Successfully!",
        icon: "success",
        
      });
    })
   
   }
  

  if (isLoading || loading) return <Loading />;

  return (
    <div className="grid relative lg:grid-cols-12 grid-cols-1 justify-between ">
      {/* Sidebar */}
    <div className="lg:col-span-2">
    <div
        className={`text-white shadow-lg z-50   fixed top-0 left-0 h-screen   transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ${
          role === "admin"
            ? "bg-gradient-to-b from-second to-second"
            : role === "seller"
            ? "bg-gradient-to-b from-[#85A844] to-[#85A844]"
            : role === "user"
            ? "bg-gradient-to-b from-[#85A844] to-[#85A844]"
            : ""
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex justify-end gap-4 border-b items-center border-white">
          <h1 className="text-lg md:text-xl font-bold">Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white text-2xl  lg:hidden"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className=" p-2 space-y-4">
          {role === "admin" && (
            <AdminRouter>
              <AdminNav />
            </AdminRouter>
          )}
          {role === "seller" && (
            <SellerRouter>
              <SellerNav />
            </SellerRouter>
          )}
          {role === "user" && <UserNav />}
          <ul className="border-t">
            
                
                 <li className=' my-4 font-semibold'><NavLink className='px-2 uppercase flex items-center justify-end gap-3  py-2'  to='/' end><span>Home</span> <IoHomeOutline size={25}></IoHomeOutline> </NavLink> </li>
                 <li className=' my-4 font-semibold '><NavLink className='px-2 uppercase flex items-center justify-end gap-3  py-2'  to='/updateProfile' end><span>Update Profile</span> <ImProfile size={23} /></NavLink></li>
               
            </ul>
        </div>

        {/* Logout Button */}
      </div>
    </div>

      {/* Main Content */}
      <div className="lg:col-span-10 lg:ml-4 relative   bg-gray-50">
        {/* Header */}
        <header className="bg-white sticky top-0 z-40 shadow p-6 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-first text-2xl"
          >
            <IoMenuSharp />
          </button>
          <h1 className="text-lg md:text-2xl text-first mx-4 capitalize font-bold">
            Welcome back , <span className="text-first">{user?.displayName}</span>
          </h1>

          <button onClick={handleLogOut} className="px-3 py-2 bg-first text-white  rounded-white font-semibold transition-colors duration-200">
            Logout
          </button>
        </header>

        {/* Main Area */}
        <main className="p-2 dark:bg-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
