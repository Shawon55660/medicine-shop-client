import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa6';
import { CgAddR } from 'react-icons/cg';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from '../CustomHook/useAuth';
import useAxiosPublic from '../CustomHook/useAxiosPublic';
import Loading from '../CommonComponent/Loading';


const Shop = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [details,setDetails] = useState([])
    const {user} = useAuth()



    const { category } = useParams()
    const axiosPublic = useAxiosPublic()
    const { data: medicinesData = [], refetch: medicinesFetch, isLoading: medicinesLoading } = useQuery({
        queryKey: ['medicinesData', 'medicinesAll'],
        queryFn: async () => {
            const catInfo = await axiosPublic.get(`/medicinesAll`)
            if (catInfo.data) {
                return catInfo.data
            }
        }

    })

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
    if(medicinesLoading) return <Loading></Loading>

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


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>GenericName </th>
                            <th>category</th>
                            <th>company</th>
                            <th>image</th>
                            <th>Price</th>
                            <th>discountPercentage</th>
                            <th>action</th>
                            


                        </tr>
                    </thead>
                    <tbody>

                        {medicinesData.map(category => <tr key={category._id}>

                            <td>{category.GenericName}</td>
                            <td>{category.category}</td>
                            <td>{category.company}</td>
                            <td><img className="w-10 h-10 object-cover" src={category.photo} alt="" /></td>

                            <td>{category.Price}</td>
                            <td>{category.discountPercentage}%</td>
                            <td className='gap-4 flex items-center h-auto text-xl'>
                        
                                <button onClick={()=>handleDetails(category._id) }><FaEye></FaEye></button>
                           
                                <button onClick={()=>handleCart(category)}><CgAddR></CgAddR></button>
                                
                                </td>

                        </tr>)}

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default Shop;
