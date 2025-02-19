import React from 'react';
import { FaLinkedin, FaSquareGithub } from 'react-icons/fa6';
import { LiaBookMedicalSolid } from 'react-icons/lia';
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
       <div className=''>
         <div className='bg-gray-200'>
            <footer className="footer   text-base-content p-10">
  <nav>
    <h6 className="footer-title">Services</h6>
   
    <a className="link link-hover">Fast Delivery</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <Link to='/aboutUs' className="link link-hover">About us</Link>
    <a className="link link-hover">Contact</a>
    <Link to='/faq' className="link link-hover">FAQ</Link>
  
  </nav>

</footer>
<footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
  <aside className="grid-flow-col items-center">
    <LiaBookMedicalSolid  color='#85A844' size={40}></LiaBookMedicalSolid  >
    <p className='font-semibold'>
     shawonahmed55660@gmail.com
      <br />
      Providing reliable  since 2025
    </p>
  </aside>
  <nav className="md:place-self-center md:justify-self-end">
    <div className="grid grid-flow-col text-2xl gap-4">
      <a target='_blank' href="https://www.linkedin.com/in/shawon-ahmed-shadhin-4b091b1a4/"><FaLinkedin /></a>
      <a target='_blank' href="https://github.com/Shawon55660"><FaSquareGithub /></a>
      <a target='_blank' href='https://www.facebook.com/shawon56660'>
      <FaFacebookSquare />
      </a>
    </div>
  </nav>
</footer>
            
        </div>
       </div>
    );
};

export default Footer;