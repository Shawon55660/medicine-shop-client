import React from 'react';
import Loading from '../../../CommonComponent/Loading';
import useAxiosPrivate from '../../../CustomHook/useAxiosPrivate';
import useAuth from '../../../CustomHook/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const SellerPayment = () => {
    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()

    const { data: paymentInfo =[], refetch, isLoading } = useQuery({
        queryKey: ['paymentInfo', 'users'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/sellerSelling?sellerEmail=${user.email}`)
            return res.data
        }
    })

    if (isLoading) return <Loading></Loading>
    return (
        <div>
             <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Transaction Id</th>
                            <th>totalPrice</th>
                            <th>data</th>
                            <th>Status</th>
                            <th>action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {paymentInfo.map(pay => <tr key={pay._id}>


                            <td>
                                {pay.transactionId}

                            </td>
                            <td>{pay.totalPrice}</td>
                            <td>{pay.date}</td>
                            <td>{pay.status}</td>
                         

                         
                        </tr>)}


                    </tbody>

                </table>
            </div>

           
        </div>
    );
};

export default SellerPayment;


