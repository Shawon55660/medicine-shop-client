import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../src/CommonComponent/navbar.css'
import useAuth from '../CustomHook/useAuth';

const Navbar = () => {
  const {user,logOut} = useAuth()
    const MainLink = 
       <>
        <NavLink className='mx-1 font-semibold p-2 uppercase' to='/'> Home</NavLink>
        <NavLink className='mx-1 font-semibold p-2 uppercase' to='/shop'> shop</NavLink>
        <NavLink className='mx-1 font-semibold p-2 uppercase' to='/cart'> cart</NavLink>
       
       
       
       </>
       const handleLogOut= ()=>{
        logOut()
        .then(res=>{
          alert('logout successfully')
        })
        .catch(error=>{
          alert('logOut failed')
        })
       }
  
    return (
        <div className='relative'>
            <div className="navbar fixed z-50 top-0 left-0 right-0 bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">{user?.displayName
    } </a>
  </div>
  <div className="flex-none  gap-2">
    <ul className=' hidden md:block mx-4'>
    {MainLink}
    
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className=" ">
        <span className=' font-semibold p-2 uppercase'>languages</span>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
      
        <li>Bangla</li>
        <li>English</li>
      </ul>
    </div>
    </ul>
    
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="M"
            src={user?.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        
           
          
          
          
         
          
           
           

       
        <li className=' font-semibold py-2 md:hidden uppercase' >
        {MainLink}
        <details>
          <summary>languages</summary>
          <ul className="bg-base-100 rounded-t-none py-2">
            <li>Bangla</li>
            <li>English</li>
          </ul>
        </details>
        </li>
       
        <li><NavLink className='mx-1 font-semibold p-2 uppercase'> Update Profile</NavLink></li>
      <li>  <NavLink className='mx-1 font-semibold p-2 uppercase' to='dashboard'> Dashboard</NavLink></li>
     <li onClick={handleLogOut}>   <NavLink className='mx-1 font-semibold p-2 uppercase'> Logout</NavLink></li>
       
      </ul>
    </div>
  </div>
</div>
            
        </div>
    );
};

export default Navbar;