import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa6';
import { CgAddR } from 'react-icons/cg';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from '../CustomHook/useAuth';
import useAxiosPublic from '../CustomHook/useAxiosPublic';
import Loading from '../CommonComponent/Loading';
import { Pagination, Select, Stack } from '@mui/material';
import { FaFilter, FaSearchPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import HelmetSet from '../CommonComponent/HelmetSet';
import CartItemCount from '../CustomHook/CartItemCount';


const Shop = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [details, setDetails] = useState([])
    const { user,Loading } = useAuth()
     const [cartData,refetch] = CartItemCount()



    const { category } = useParams()
    const axiosPublic = useAxiosPublic()
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [search,setSearch]= useState('')
    const navigate = useNavigate()
    let limit = 6

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const fetchData = async (page) => {
        const catInfo = await axiosPublic.get(`/medicinesAll?page=${page}&limit=${limit}&search=${search}`)
        if (catInfo.data) {
            setData(catInfo.data.perPageData)
            setTotalPages(Math.ceil(catInfo.data.total / limit));
            
        }
       
        
    }
    useEffect(() => {
        setOrder('')
        fetchData(currentPage)
      
        
    }, [currentPage,search])

    const handleDetails = async (id) => {


        const res = await axiosPublic.get(`/medicines-details/${id}`)
        if (res.data) {
            setDetails(res.data)
        }

        openModal()

    }
    const handleCart = async (userInfo) => {
        if (!user?.email){
         toast.warning("add to cart login first", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false, 
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                           
                          
                          });
                      
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
        const medicineInfo = {
            medicineId: userInfo._id,
            sellerEmail: userInfo.sellerEmail,
            userEmail: user.email,
            quentity: 1,
            category: userInfo.category,
            GenericName: userInfo.GenericName,
            photo: userInfo.photo,
            Price: userInfo.Price,
            DisPrice: userInfo.discountPercentage,

            ItemName: userInfo.ItemName
        }

        const res = await axiosPublic.post(`/cart`, medicineInfo)

        if (res.data.insertedId) {
            refetch()
         
            toast.success("Profile Update Successfully", {
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
        else {
           toast.error(`${res.data.error}`, {
                          position: "top-center",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                         
                          });
        }
    }
    const [order, setOrder] = useState('')
    
    const handleSort = (e) => {
        const sortOrder = e.target.value;
        setOrder(sortOrder);
    
        const sortedData = [...data].sort((a, b) =>
            sortOrder === 'asc' ? a.Price - b.Price : b.Price - a.Price
        );
    
        setData(sortedData); 
    };
    
   
  const dataMatch =   data.filter(match=> match.ItemName !== search)

   

 
    return (
        <div className=''>
            <ToastContainer></ToastContainer>
            <HelmetSet sub1='MediStore' sub2='Shop'></HelmetSet>
          
           <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
               {/* Modal Overlay */}
               <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
               
               {/* Modal Content */}
               <DialogPanel
                   className={`fixed inset-0 flex items-center justify-center p-6 overflow-y-auto transition-all duration-500 
                   ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
               >
                   <div className="w-full max-w-3xl bg-white dark:bg-gray-800  p-6 shadow-lg rounded-xl flex flex-col max-h-[80vh]">
                       
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
            <div className='relative'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between items-end   justify-end '>

                    <div className='my-3 flex    text-center   items-center h-10'>
                        <input type="text"onChange={e=> setSearch(e.target.value)} placeholder='Search Products by ItemName' className='border-[1px] px-4 dark:bg-gray-800 dark:text-white  h-full rounded-l-md border-first outline-none' /><button className='bg-first   h-full px-6 text-white rounded-r-md'><FaSearchPlus ></FaSearchPlus></button>
                    </div>
                    <div className='flex'>
                        <button className='text-white  bg-first px-4 rounded-l-md'><FaFilter /></button>
                        <select value={order} onChange={handleSort} className=" dark:bg-gray-800 px-2 py-2 rounded-r-md text-first outline-none border-[1px] border-first  max-w-xs">
                            <option value="" disabled>
                            Sort by Price
                            </option>
                           
                            <option value='asc'>Ascending  Order</option>
                            <option value='des'>Descending  Order</option>

                        </select>
                    </div>
                </div>
                {!dataMatch.length && <p className='flex capitalize text-2xl font-semibold text-first  justify-center w-full text-center items-center min-h-screen'>no data match</p> }
              
                <div className='grid md:grid-cols-2 my-8 lg:grid-cols-3 gap-3'>
                
                    {/* card satart  */}
                  
                    {
                        data.map(item => <div className='flex relative  flex-col h-full dark:border-gray-500 rounded-sm border-[1px] p-4' key={item._id}>
                            
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
                                <h2 className='font-semibold text-thrid dark:text-gray-300 text-sm py-1'> {item.Massunit} </h2>

                                <div className='flex gap-6 justify-center text-center items-center py-1'>
                                    <h3 className='text-thrid dark:text-gray-300 line-through font-mono italic'>MRP.{item.Price}tk</h3>
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
            <div className='flex justify-center my-4 '>
                <Stack className='text-first dark:text-white' spacing={2}>

                    <Pagination className='text-first '
                        count={totalPages}
                        page={currentPage}
                        onChange={handleChange}
                         sx={{
    '& .MuiPaginationItem-root': {
      color: '#85A844',
      borderColor: '#85A844',
    },
    '& .Mui-selected': {
      backgroundColor: '#85A844',
      color: 'white',
    }
  }}

                        variant="outlined" shape="rounded" />
                </Stack>
            </div>

        </div>
    );
};

export default Shop;
