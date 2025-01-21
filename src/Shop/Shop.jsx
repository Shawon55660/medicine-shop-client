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
import { FaSearchPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import HelmetSet from '../CommonComponent/HelmetSet';


const Shop = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [details, setDetails] = useState([])
    const { user,Loading } = useAuth()



    const { category } = useParams()
    const axiosPublic = useAxiosPublic()
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [search,setSearch]= useState('')
    const navigate = useNavigate()
    let limit = 1

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
                            <button onClick={() => handleCart(details)}

                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Add To Cart
                            </button>
                        </div>

                    </div>
                </DialogPanel>
            </Dialog>


            <div className='relative'>
                <div className='flex items-center justify-between'>

                    <div className='my-3 flex    text-center   items-center h-10'>
                        <input type="text"onChange={e=> setSearch(e.target.value)} placeholder='Search Products by ItemName' className='border-[1px] px-4  h-full rounded-l-md border-first outline-none' /><button className='bg-first  h-full px-6 text-white rounded-r-md'><FaSearchPlus ></FaSearchPlus></button>
                    </div>
                    <div>
                        <select value={order} onChange={handleSort} className=" px-2 py-2 rounded-md text-first outline-none border-[1px] border-first w-full max-w-xs">
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
                                    <h2 className='font-semibold text-second text-xl py-1'>{item.ItemName} {item.Massunit}mg</h2>
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
                <Stack className='text-first' spacing={2}>

                    <Pagination className='text-first'
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
