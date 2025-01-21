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
            <li className=' my-4'><NavLink className='px-2 flex items-center justify-end gap-2  py-2'  to='/dashboard/AdminHome' end> <span>Admin Home</span><MdOutlineAdminPanelSettings size={30}  ></MdOutlineAdminPanelSettings ></NavLink></li>

            <li  className=' my-4'><NavLink to='/dashboard/users'  className='px-2 flex items-center justify-end gap-2  py-2'><span>Manage Users </span><FaUserCog  size={30}></FaUserCog></NavLink></li>
                <li className='my-4'><NavLink  className='px-2 flex items-center justify-end gap-2  py-2'  to='/dashboard/manageCategory'><span>Manage Category</span> <TbCategoryPlus size={30} /></NavLink></li>
                <li className=' my-4'><NavLink className='px-2 flex items-center justify-end gap-2  py-2'  to='/dashboard/paymentManagement'><span>Payment Management</span> <MdManageHistory size={30}/></NavLink></li>
                <li className=' my-4'><NavLink className='px-2 flex items-center justify-end gap-2  py-2'  to='/dashboard/salesReport'><span>
                Sales Report</span> <TbReportMoney size={30} /></NavLink></li>
                <li  className=' my-4' ><NavLink className='px-2 flex items-center justify-end gap-2  py-2' to='/dashboard/bannarAdvertise'><span>Bannar  Advertisement </span><RiAdvertisementLine size={30} /></NavLink></li>
            </ul>
            
        </div>
    );
};

export default AdminNav;