import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../CustomHook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa6';
import { CgAddR } from 'react-icons/cg';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from '../../CustomHook/useAuth';
import Loading from '../../CommonComponent/Loading';
import { toast } from 'react-toastify';
import HelmetSet from '../../CommonComponent/HelmetSet';


const CategoryPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [details,setDetails] = useState([])
    const {user} = useAuth()
   const navigate = useNavigate()


    const { category } = useParams()
    const axiosPublic = useAxiosPublic()
    const { data: medicinesData = [], refetch: medicinesFetch, isLoading: medicinesLoading } = useQuery({
        queryKey: ['medicinesData', category],
        queryFn: async () => {
            const catInfo = await axiosPublic.get(`/category-medicines?category=${category}`)
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
         if (!user?.email){
                             toast.warning("add to cart login first", {
                                            position: "top-center",
                                            autoClose: 2000,
                                            hideProgressBar: false, 
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                           
                                          
                                          });
                             navigate('/login')            
                        }
                        if(user?.email === userInfo?.sellerEmail){
                                  return  toast.warning("Seller can't buy his own products", {
                                        position: "top-center",
                                        autoClose: 2000,
                                        hideProgressBar: false, 
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                       
                                      
                                      });
                                    
                        
                                }
       const medicineInfo ={
    medicineId:userInfo._id,
    sellerEmail:userInfo.sellerEmail,
    userEmail:user.email,
    quentity:1,
    category:userInfo.category,
    GenericName:userInfo.GenericName,
    photo:userInfo.photo,
    Price:userInfo.Price,
    DisPrice: userInfo.discountPercentage,
  
    ItemName:userInfo.ItemName
    }
   
        const res = await axiosPublic.post(`/cart`,medicineInfo)
       
        if(res.data.insertedId){
          return  toast.success("Profile Update Successfully", {
                                       position: "top-center",
                                       autoClose: 2000,
                                       hideProgressBar: true, 
                                       closeOnClick: true,
                                       pauseOnHover: true,
                                       draggable: true,
                                       icon: <span style={{ color: "#85A844" }}> <img src="https://img.icons8.com/?size=100&id=59850&format=png&color=85A844" alt="" srcset="" /></span>,
                                       style: { backgroundColor: "#FFFFF", color: "#85A844", fontWeight: "bold" }, 
                                     });
        }
        else{
            return  toast.warning(`${res.data.error} this product`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false, 
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
               
              
              });
           
        }
    }
if(medicinesLoading) return <Loading></Loading>
    return (
        <div className=''>
            <HelmetSet sub1='Category' sub2={category}></HelmetSet>
        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
            {/* Modal Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
            
            {/* Modal Content */}
            <DialogPanel
                className={`fixed inset-0 flex items-center justify-center p-6 overflow-y-auto transition-all duration-500 
                ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
                <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl flex flex-col max-h-[80vh]">
                    
                    {/* Product Image */}
                    <div className="flex justify-center mb-4">
                        <img className="w-[200px] h-[200px] object-cover rounded-lg shadow-lg" src={details.photo} alt={details.ItemName} />
                    </div>
        
                    {/* Product Information */}
                    <div className="flex flex-col space-y-3 text-gray-600 dark:text-white overflow-y-auto flex-1 max-h-[60vh]">
                        <p className="text-2xl font-bold text-first text-center">{details.ItemName}</p>
                        <p className="text-lg text-second dark:text-white text-center">{details.GenericName}</p>
        
                        {/* Additional Details */}
                        <p><strong>Category:</strong> {details.category}</p>
                        <p><strong>Company:</strong> {details.company}</p>
                        <p><strong>Mass Unit:</strong> {details.Massunit}</p>
                        
                        <p><strong>Price:</strong> {details.Price} tk</p>
                        <p><strong>Discount:</strong> {details.discountPercentage}%</p>
                        
                    </div>
        
                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={closeModal}
                            className="px-6 py-3 bg-gray-500 text-white rounded-sm hover:bg-opacity-90 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleCart(details)}
                            className="px-6 py-3 bg-[#85A844] text-white rounded-sm hover:bg-opacity-90 transition duration-300"
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
                           medicinesData.map(item => <div className='flex relative  flex-col h-full rounded-sm dark:border-gray-500 border-[1px] p-4' key={item._id}>
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
                                       <h2 className='font-semibold text-second dark:text-white text-xl py-1'>{item.ItemName}</h2>
                                <h2 className='font-semibold text-thrid text-sm py-1 dark:text-gray-300' > {item.Massunit} </h2>
                                       <div className='flex gap-6 justify-center text-center items-center py-1'>
                                           <h3 className='text-thrid line-through dark:text-gray-300 font-mono italic'>MRP.{item.Price}tk</h3>
                                           <h3 className='font-bold text-md italic  text-first'>MRP. {Math.floor(item.Price - ((item.Price * item.discountPercentage) / 100))} tk</h3>
            
                                       </div>
                                   </div>
                               </div>
                               <div className='flex flex-col justify-center gap-3 mt-1 items-center' >
                                   <button onClick={() => handleCart(item)} className='uppercase flex items-center text-sm gap-2 font-semibold bg-first text-white px-4 py-[7px]'> <CgAddR size={18}></CgAddR> <span>add to cart</span></button>
            
                                   <button className='flex font-semibold text-thrid dark:text-white items-center gap-2 uppercase  text-xs ' onClick={() => handleDetails(item._id)} > <FaEye size={14}></FaEye><span>quick veiw</span></button>
                               </div>
                           </div>)
                       }
                       
            
                   </div>
            
                        </div>

        </div>
    );
};

export default CategoryPage;