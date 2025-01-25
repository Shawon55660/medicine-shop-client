import React from 'react';
import useAxiosPrivate from '../../../CustomHook/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import { FaFileMedicalAlt } from 'react-icons/fa';
import { MdOutlinePendingActions, MdPayments } from 'react-icons/md';
import Loading from '../../../CommonComponent/Loading';
import useAuth from '../../../CustomHook/useAuth';
import HelmetSet from '../../../CommonComponent/HelmetSet';

const SellerHome = () => {
    const axiosPrivate =useAxiosPrivate()
    const {user} =useAuth()
     const { data: paymentInfo =[], refetch, isLoading } = useQuery({
            queryKey: ['paymentInfo', 'users'],
            queryFn: async () => {
                const res = await axiosPrivate.get(`/sellerSelling?sellerEmail=${user.email}`)
                return res.data
            }
        })
   
   const  totalPending = paymentInfo.filter(sale=> sale.status == 'pending')
   const totalPendingRevenu = totalPending.reduce((total, item) => total + (Math.floor(item.Price - ((item.Price * item.DisPrice) / 100))), 0);
   const  totalPaid = paymentInfo.filter(sale=> sale.status == 'paid')
 const totalRevenus = totalPaid.reduce((total, item) => total + (Math.floor(item.Price - ((item.Price * item.DisPrice) / 100))), 0);
if(isLoading) return <Loading></Loading>
    return (
        <div className='p-8'>

            <HelmetSet sub1='Dashboard' sub2='Seller  Home'></HelmetSet>
           <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-4 p-4 justify-center items-center min-h-[50vh]  shadow-xl">
  <div className="stat text-first flex items-center justify-center ">
  <div><FaFileMedicalAlt size={35} /></div>
   <div> <div className="stat-title text-second font-semibold mb-1">Total Sales Revenue</div>
   <div className="stat-value text-first">{totalRevenus}TK</div></div>
   
  </div>

  <div className="stat text-white flex items-center justify-center bg-sky-400">
  <div><MdPayments size={35} /></div>
    
   <div> <div className="stat-title font-semibold mb-1 text-white">Total Payment: {totalPaid.length}</div>
   <div className="stat-value text-center text-white">{totalRevenus}TK</div></div>
   
  </div>


    <div className="stat bg-first text-white flex items-center justify-center">
        <div><MdOutlinePendingActions size={35}/></div>
     
  
   
  <div>
  <div className="stat-title font-semibold mb-1 text-white">Total Pending: {totalPending.length}</div>
  <div className="stat-value text-center text-white">{totalPendingRevenu}TK</div>

  </div>
 
  </div>
</div>
        </div>
    );
};

export default SellerHome;