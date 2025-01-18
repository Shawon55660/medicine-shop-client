import React from 'react';
import useAxiosPrivate from '../CustomHook/useAxiosPrivate';
import useAuth from '../CustomHook/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa6';

import { FaTrashAlt } from 'react-icons/fa';
import Loading from '../CommonComponent/Loading';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { user } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const { data: cartData = [], isLoading: medicinesLoading, refetch } = useQuery({
        queryKey: ['cartData', user.email],
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



    if (medicinesLoading) return <Loading></Loading>
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>GenericName </th>
                            <th>category</th>

                            <th>image</th>
                            <th>Price</th>
                            <th>quentity</th>

                            <th>action</th>



                        </tr>
                    </thead>
                    <tbody>

                        {cartData.map(cart => <tr key={cart._id}>

                            <td>{cart.GenericName}</td>
                            <td>{cart.category}</td>

                            <td><img className="w-10 h-10 object-cover" src={cart.photo} alt="" /></td>

                            <td>{cart.Price}</td>
                            <td className='text-xl flex gap-4 '>
                                <button onClick={() => cartDecrease(cart._id)}>-</button>
                                <button>{cart.quentity}</button>
                                <button disabled={cart.quentity == cart.Massunit} onClick={() => cartIncrease(cart._id)}>+</button></td>

                            <td className='text-xl'>



                                <button onClick={() => handleDelete(cart._id)}><FaTrashAlt></FaTrashAlt></button>

                            </td>

                        </tr>)}

                    </tbody>

                </table>
                {cartData.length > 0 ? <div className='text-right'>  <button onClick={deleteCart} className='btn btn-warning'>Delete All</button></div> : ''}
                <button className='btn text-center btn-success'><Link to='/checkOut'>CheckOut</Link></button>
            </div>

        </div>
    );
};

export default CartPage;