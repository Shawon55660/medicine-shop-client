import React from 'react';
import useAxiosPrivate from '../CustomHook/useAxiosPrivate';
import useAuth from '../CustomHook/useAuth';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteOutline } from "react-icons/md";
import { LuDelete } from "react-icons/lu";

import { FaTrashAlt } from 'react-icons/fa';
import Loading from '../CommonComponent/Loading';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCartPlus } from 'react-icons/fa6';
import HelmetSet from '../CommonComponent/HelmetSet';

const CartPage = () => {
    const { user } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const { data: cartData = [], isLoading: medicinesLoading, refetch } = useQuery({
        queryKey: ['cartData', user?.email],
        queryFn: async () => {
            const catInfo = await axiosPrivate.get(`/cartsOwner?userEmail=${user?.email}`)
            if (catInfo.data) {
                return catInfo.data
            }
        }

    })
    const handleDelete = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPrivate.delete(`/cart-delete/${id}`)

                if (res.data) {
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });


                }

            }
            await refetch()
        });

    }
    const deleteCart = async () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPrivate.delete(`/cart-deleteAll?userEmail=${user.email}`)

                if (res.data) {
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });


                }

            }
            await refetch()
        });

    }
    const cartIncrease = async (id) => {

        const res = await axiosPrivate.patch(`/cartUpdateInc/${id}`)

        if (res.data.modifiedCount) {
            refetch()
        }
        else {
            Swal.fire('Quantity cannot be more unit')
        }

    }
    const cartDecrease = async (id) => {

        const res = await axiosPrivate.patch(`/cartUpdateDec/${id}`)

        if (res.data.modifiedCount) {
            refetch()
        }

        else {
            Swal.fire('Quantity cannot be reduced below 1')
        }

    }

    const totalPrice = cartData.reduce((total, item) => total +  (Math.floor(item.Price - ((item.Price * item.DisPrice) / 100))), 0);

    if (medicinesLoading) return <Loading></Loading>
    return (
        <div className='w-11/12 md:w-full mx-auto '>
            <HelmetSet sub1='MediStore' sub2='Cart'></HelmetSet>
            {cartData.length == 0 &&  <div className='uppercase flex flex-col justify-center items-center min-h-screen'>
                <p className='font-bold text-xl text-first'>No Item In Cart </p>
                <Link className='bg-first font-semibold py-2 px-4 text-white rounded-sm my-2' to='/shop'>add now</Link>
                 </div> }
           {cartData.length > 0 &&   <div className='border-b mt-8 mb-4 flex justify-between pb-2 items-center'>
                <p className='text-lg font-semibold text-second uppercase'>Delete All Item</p>
               <div className='text-right text-thrid'>  <button onClick={deleteCart} className=' flex items-center  gap-2'><MdDeleteOutline size={20} ></MdDeleteOutline > <span>Delete All</span></button></div> 
            </div>}

            {
                cartData.map(cart=> <div key={cart._id} className='flex  flex-col md:flex-row mb-4 justify-between md:items-center '>
                   <div className='flex  gap-4'>
                   <div className='max-w-[70px] max-h-[70px] md:max-w-[100px] md:max-h-[100px]'><img className='w-full border-2 border-first rounded-3xl h-full object-cover' src={cart.photo} alt="" /></div>
                    <div>
                        <h2 className='text-sm md:text-xl font-semibold'>{cart.ItemName}</h2>
                        <p className='text-xs md:text-[17px] md:py-1 font-semibold text-first'>{cart.category}</p>
                        <p className='text-second text-xs  py-1 md:text-[16px]'>{cart.GenericName}</p>
                        <p className='text-first  text-xs font-bold  py-1 md:text-[16px]'>{cart.DisPrice} % OFF</p>
                    </div>
                   </div>
                    <div className='flex items-center gap-6'>
                    <div className='leading-10'>
                    <h3 className='font-bold text-sm md:text-md italic   text-first'>MRP. {Math.floor(cart.Price - ((cart.Price * cart.DisPrice) / 100))} tk</h3>
                    <h3 className='text-thrid line-through text-xs md:text-sm font-mono italic'>MRP.{cart.Price}tk</h3>

                    </div>
                    <div>
                    <div className='text-xl flex gap-8 '>
                               <div className='flex gap-3'>
                               <button className='btn btn-xs md:btn-sm text-sm md:text-xl text-second' disabled={cart.quentity==1} onClick={() => cartDecrease(cart._id)}>-</button>
                                <button className='text-sm md:text-xl text-second'>{cart.quentity}</button>
                                <button className='btn  btn-xs md:btn-sm  text-sm md:text-xl text-second' disabled={cart.quentity == cart.Massunit} onClick={() => cartIncrease(cart._id)}>+</button>
                               </div>
                                <button className='text-first' onClick={() => handleDelete(cart._id)}><LuDelete /></button>
                                
                                </div>
                                
                    </div>
                    </div>
        
                  </div>)
            }
          
         


                {/* 
                 */}
                   
                 
                {cartData.length > 0 &&  <div className='flex bg-first text-white my-2 rounded-sm p-1 justify-between '>
                    <div className='flex items-center gap-2'><div className=' p-3 m-1 rounded-lg bg-[#66852c]'> <FaCartPlus size={20} ></FaCartPlus></div>
                    <div className='font-semibold'><p>{cartData.length} items</p>
                    
                    <p> Total: {totalPrice} tk</p></div>
                    
                    </div>
                    <button className=' '><Link className=' text-center font-semibold flex items-center gap-1 mx-2' to='/checkOut'> <span>Place Order</span><FaArrowRight ></FaArrowRight></Link></button>
                    </div>}
               
                
            </div>

       
    );
};

export default CartPage;