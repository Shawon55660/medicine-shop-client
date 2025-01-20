import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa6';
import { CgAddR } from 'react-icons/cg';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from '../CustomHook/useAuth';
import useAxiosPublic from '../CustomHook/useAxiosPublic';
import Loading from '../CommonComponent/Loading';
import { Pagination, Stack } from '@mui/material';


const Shop = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [details,setDetails] = useState([])
    const {user} = useAuth()



    const { category } = useParams()
    const axiosPublic = useAxiosPublic()
    const [data, setData] = useState([]); 
    const [totalPages, setTotalPages] = useState(1); 
    const [currentPage, setCurrentPage] = useState(1);
    let limit = 3
  
    const handleChange = (event, value) => {
        setCurrentPage(value); 
      };

       const fetchData = async (page) => {
            const catInfo = await axiosPublic.get(`/medicinesAll?page=${page}&limit=${limit}`)
            if (catInfo.data) {
                setData(catInfo.data.perPageData)
                setTotalPages(Math.ceil(catInfo.data.total / limit));
            }
        }
 useEffect(()=>{
    fetchData(currentPage)
 },[currentPage])

    const handleDetails = async(id)=>{

        
        const res = await axiosPublic.get(`/medicines-details/${id}`)
      if(res.data){
        setDetails(res.data)
      }
          console.log(res.data)
        openModal()
        
    }
    const handleCart = async(userInfo)=>{
        if(!user.email)return alert('login first')
       const medicineInfo ={
    medicineId:userInfo._id,
    sellerEmail:userInfo.sellerEmail,
    userEmail:user.email,
    quentity:1,
    category:userInfo.category,
    GenericName:userInfo.GenericName,
    photo:userInfo.photo,
    Price:userInfo.Price,
   
    ItemName:userInfo.ItemName
    }
    
        const res = await axiosPublic.post(`/cart`,medicineInfo)
       
        if(res.data.insertedId){
            alert('cart added successfully')
        }
        else{
            alert(res.data.error)
        }
    }

if(!data.length) return <Loading></Loading>
    return (
        <div className=''>
         <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                         {/* Modal Overlay */}
                         <div
                             className="fixed inset-0 bg-black bg-opacity-25"
                             aria-hidden="true"
                         />
                         {/* Modal Content */}
                         <DialogPanel className="fixed inset-0 flex items-center overflow-y-auto justify-center p-4">
                             <div className="w-full max-w-xl rounded bg-white p-6 shadow-lg">
                                 <img className='w-[300px] h-[300px]  object-cover' src={details.photo} alt="" />
                                 <p className="mt-2 text-xl text-gray-600">
                                     {details.GenericName}
                                 </p>
                                 <p className="mt-2 text-xl text-gray-600">
                                     {details.ItemName}
                                 </p>
         
         
                                 <div className="mt-4 flex justify-end space-x-4">
                                         <button
                                             onClick={closeModal}
                                             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                         >
                                             Cancel
                                         </button>
                                         <button onClick={()=>handleCart(details)}
         
                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                         >
                                            Add To Cart
                                         </button>
                                     </div>
         
                             </div>
                         </DialogPanel>
                     </Dialog>


            <div className=''>
            <div className='grid md:grid-cols-2 my-8 lg:grid-cols-3 gap-3'>
           
           {/* card satart  */}
           {
               data.map(item => <div className='flex relative  flex-col h-full rounded-sm border-[1px] p-4' key={item._id}>
                   {item.discountPercentage > 0 && <p className='w-8 text-sm font-semibold absolute top-1 right-1 h-8 flex items-center justify-center p-6 bg-first opacity-90 text-white rounded-full z-20 '>-{item.discountPercentage}%</p>}


                   <div className='flex-grow '>
                       <div className='md:h-[200px]'><img className='h-full rounded-sm w-full object-cover' src={item.photo} alt="" /></div>
                       <div className='text-center'>
                           <div className="rating pt-2  rating-sm">
                               <input type="radio" name="rating-4" className="mask mask-star-2 bg-first" />
                               <input type="radio" name="rating-4" className="mask mask-star-2 bg-first" defaultChecked />
                               <input type="radio" name="rating-4" className="mask mask-star-2 bg-first" />
                               <input type="radio" name="rating-4" className="mask mask-star-2 bg-first" />
                               <input type="radio" name="rating-4" className="mask mask-star-2 bg-first" />
                           </div>
                           <h2 className='font-semibold text-second text-xl py-1'>{item.ItemName} {item.Massunit} mg</h2>
                           <div className='flex gap-6 justify-center text-center items-center py-1'>
                               <h3 className='text-thrid line-through font-mono italic'>MRP.{item.Price}tk</h3>
                               <h3 className='font-bold text-md italic  text-first'>MRP. {Math.floor(item.Price - ((item.Price * item.discountPercentage) / 100))} tk</h3>

                           </div>
                       </div>
                   </div>
                   <div className='flex flex-col justify-center gap-3 mt-1 items-center' >
                       <button onClick={() => handleCart(item)} className='uppercase flex items-center text-sm gap-2 font-semibold bg-first text-white px-4 py-[7px]'> <CgAddR size={18}></CgAddR> <span>add to cart</span></button>

                       <button className='flex font-semibold text-thrid items-center gap-2 uppercase  text-xs ' onClick={() => handleDetails(item._id)} > <FaEye size={14}></FaEye><span>quick veiw</span></button>
                   </div>
               </div>)
           }
           

       </div>

            </div>
            <div className='flex justify-center my-4 '>
            <Stack spacing={2}>
     
     <Pagination
       count={totalPages}
       page={currentPage}
       onChange={handleChange}
       color='success'
   variant="outlined" shape="rounded" />
   </Stack>
            </div>

        </div>
    );
};

export default Shop;
