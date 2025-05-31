import React from 'react';
import { FaLinkedin, FaSquareGithub } from 'react-icons/fa6';
import { LiaBookMedicalSolid } from 'react-icons/lia';
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
       <div className=''>
         <div className='bg-gray-200 dark:bg-gray-600 '>
            <footer className="footer dark:text-white  flex flex-col md:flex-row justify-evenly  md:items-center text-base-content p-10">
 
 
  <div className=' flex flex-col  gap-6'>
    <aside className="flex gap-2   items-center">
    <LiaBookMedicalSolid  color='#85A844' size={40}></LiaBookMedicalSolid>
    <div className='flex flex-col  dark:text-gray-300 font-semibold gap-1'>
      <p className=''>
     shawonahmed55660@gmail.com
       </p>
      <p>Providing reliable  since 2025</p>
    </div>
   
  </aside>
  <nav className="px-2">
    <div className="flex text-2xl gap-4 items-center justify-center">
      <a target='_blank' href="https://www.linkedin.com/in/shawon-ahmed-shadhin-4b091b1a4/"><FaLinkedin /></a>
      <a target='_blank' href="https://github.com/Shawon55660"><FaSquareGithub /></a>
      <a target='_blank' href='https://www.facebook.com/shawon56660'>
      <FaFacebookSquare />
      </a>
    </div>
  </nav>
  </div>
   <nav className=''>
    <h6 className="footer-title">Company</h6>
    <Link to='/aboutUs' className="link link-hover">About us</Link>
    <Link to='/contact'  className="link link-hover">Contact</Link>
    <Link to='/faq' className="link link-hover">FAQ</Link>
  
  </nav>

</footer>

            
        </div>
       </div>
    );
};

export default Footer;