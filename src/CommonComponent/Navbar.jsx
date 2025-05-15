import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../src/CommonComponent/navbar.css'
import useAuth from '../CustomHook/useAuth';
import { FaHome, FaShoppingBag, FaUserEdit } from 'react-icons/fa';
import { IoCart, IoLogInSharp } from 'react-icons/io5';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings, MdManageAccounts, MdOutlineControlPoint } from 'react-icons/md';
import { LuLogOut } from 'react-icons/lu';
import { LiaBookMedicalSolid } from 'react-icons/lia';
import { FaBlogger } from "react-icons/fa6";
import navImg from'../../src/assets/navbarimg.png'
import Loading from './Loading';
import Swal from 'sweetalert2';
import useAxiosPrivate from '../CustomHook/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../CustomHook/useAxiosPublic';

const Navbar = () => {
  const {user,logOut,loading} = useAuth()
   
      const axiosPublic = useAxiosPublic()
  
      const { data: cartData = [], isLoading: medicinesLoading, refetch } = useQuery({
          queryKey: ['cartData', user?.email],
          queryFn: async () => {
              const catInfo = await axiosPublic.get(`/cartsOwner?userEmail=${user?.email}`)
              if (catInfo.data) {
                  return catInfo.data
              }
          }
  
      })
    const MainLink = 
       <>
        <NavLink className='mx-1 font-semibold px-3 py-2 text-sm flex gap-2 items-center uppercase' to='/'><FaHome size={20}></FaHome> <p>home</p></NavLink>
        <NavLink className='mx-1 flex gap-2 items-center  text-sm font-semibold px-3 py-2 uppercase' to='/shop'>  <FaShoppingBag size={15}></FaShoppingBag><p>shop</p></NavLink>
        <NavLink className='mx-1 relative  flex gap-2 items-center text-sm font-semibold px-3 py-2  uppercase' to='/cart'><span className='absolute top-1 text-xs left-1 bg-first px-1 text-white rounded-full '>{cartData.length}</span> <IoCart size={20}></IoCart> <p>cart</p></NavLink>
        <NavLink className='mx-1 flex gap-2 items-center text-sm font-semibold px-3 py-2  uppercase' to='/aboutUs'><FaBlogger size={20}></FaBlogger> <p>About Us</p></NavLink>
       
       
       
       </>
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
      
  
    return (
        <div className='relative container'>
            <div style={{backgroundImage:`url(${navImg})`}} className="navbar text-white text-sm  bg-contain  fixed z-50 top-0 left-0 right-0 font-sans	 bg-first">
  <div className="flex-1 gap-2 items-center ml-12 lg:ml-0 ">
    <Link to='/' className=" text-xl"><LiaBookMedicalSolid  size={40}></LiaBookMedicalSolid  > </Link>
   <Link to='/'> <p className='text-xl font-mono italic font-semibold'>MediStore</p></Link>
  </div>
  <div className="flex-none  gap-2">
    <ul className=' md:flex items-center hidden  mx-4'>
    {MainLink}
    
    {user?.email ?<div className="dropdown dropdown-end">
     
     
    </div>: <NavLink to='/login' className='mx-1 font-semibold px-3 py-2 text-sm flex gap-2 items-center uppercase'><p>login</p></NavLink>}
    </ul>
    
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="">
        <div className="w-10 h-10 border-2 shadow-sm  rounded-full">
          {user?.photoURL ?<img  className='w-full h-full object-cover rounded-full'
            alt="M"
            src={user?.photoURL} />: <img src="https://img.icons8.com/?size=100&id=RdjqkglzQyOE&format=png&color=FFFFFF" alt="" />}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-first leading-8 rounded-box z-[1] mt-3  w-60 p-2 shadow">
        
        
       
        <Link className=' flex flex-col font-semibold py-2  md:hidden uppercase' >
        {MainLink}
       
        </Link>
       
      {user?.email &&  <NavLink to='/updateProfile' className='mx-1 font-semibold text-sm px-3 py-2  flex gap-2 items-center uppercase'> <FaUserEdit  size={20}></FaUserEdit ><p> Update Profile</p></NavLink>}
      {user?.email &&  <NavLink className='mx-1 font-semibold text-sm px-3 py-2 flex gap-2 items-center uppercase' to='dashboard'><MdAdminPanelSettings    size={25}></MdAdminPanelSettings  > <p>Dashboard</p></NavLink>}
      {user?.email ? <NavLink to='/login' onClick={handleLogOut} className='mx-1 text-sm flex gap-2 items-center font-semibold px-3 py-2 uppercase'> <LuLogOut size={20}></LuLogOut> <p>Logout</p></NavLink>
       :<NavLink to='/SignUp' className='mx-1 font-semibold px-3 py-2 text-sm flex gap-2 items-center uppercase'><LuLogOut size={20}></LuLogOut><p>Join Now</p></NavLink>}
     
      </ul>
    </div>
  </div>
</div>
            
        </div>
    );
};

export default Navbar;