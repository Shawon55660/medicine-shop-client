import React from 'react';
import Loading from '../../../CommonComponent/Loading';
import useAxiosPrivate from '../../../CustomHook/useAxiosPrivate';
import useAuth from '../../../CustomHook/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const PaymentManagement = () => {
    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()

    const { data: paymentInfo =[], refetch, isLoading } = useQuery({
        queryKey: ['paymentInfo', 'users'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/payments')
            return res.data
        }
    })
    const handlePayment = async(id)=>{
        const res = await axiosPrivate.patch(`/paymentUpdate/${id}`)
        console.log(res.data.modifiedCount)
        if(res.data){
            refetch()
            Swal.fire('payment Confrim')
        }
    }
    if (isLoading) return <Loading></Loading>
    return (
        <div>
             <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Buyer Email</th>
                            <th>totalPrice</th>
                            <th>data</th>
                            <th>Status</th>
                            <th>action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {paymentInfo.map(pay => <tr key={pay._id}>


                            <td>
                                {pay.buyerEmail}

                            </td>
                            <td>{pay.totalPrice}</td>
                            <td>{pay.data}</td>
                            <td>{pay.status}</td>
                            <td><button disabled={pay.status=='paid'} onClick={()=>handlePayment(pay._id)} className='btn btn-success'>accept payment</button></td>

                         
                        </tr>)}


                    </tbody>

                </table>
            </div>

           
        </div>
    );
};

export default PaymentManagement;