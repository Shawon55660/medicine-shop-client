import React from 'react';
import { FaUserCog } from 'react-icons/fa';
import { MdManageHistory, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { TbCategoryPlus, TbReportMoney } from "react-icons/tb";
import { RiAdvertisementLine } from "react-icons/ri";





const AdminNav = () => {
    return (
        <div>
            <ul className='text-right  font-semibold w-full'>
            <li className=' my-4'><NavLink className='px-1 flex items-center justify-end gap-2 font-semibold  py-2'  to='/dashboard/AdminHome' end> <span>Admin Home</span><MdOutlineAdminPanelSettings size={25}  ></MdOutlineAdminPanelSettings ></NavLink></li>

            <li  className=' my-4'><NavLink to='/dashboard/users'  className='px-1 flex uppercase items-center justify-end gap-2 font-semibold py-2'><span>Manage Users </span><FaUserCog  size={25}></FaUserCog></NavLink></li>
                <li className='my-4'><NavLink  className='px-1 flex uppercase items-center justify-end gap-2  py-2'  to='/dashboard/manageCategory'><span>Manage Category</span> <TbCategoryPlus size={25} /></NavLink></li>
                <li className=' my-4'><NavLink className='px-1 flex uppercase items-center justify-end gap-2  py-2'  to='/dashboard/paymentManagement'><span>Payment Management</span> <MdManageHistory size={25}/></NavLink></li>
                <li className=' my-4'><NavLink className='px-1 flex uppercase items-center justify-end gap-2  py-2'  to='/dashboard/salesReport'><span>
                Sales Report</span> <TbReportMoney size={25} /></NavLink></li>
                <li  className=' my-4' ><NavLink className='px-1 flex uppercase items-center justify-end gap-2  py-2' to='/dashboard/bannarAdvertise'><span>Bannar  Advertisement </span><RiAdvertisementLine size={25} /></NavLink></li>
            </ul>
            
        </div>
    );
};

export default AdminNav;