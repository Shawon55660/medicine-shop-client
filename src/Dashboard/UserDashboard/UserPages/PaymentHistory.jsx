import React from 'react';
import Loading from '../../../CommonComponent/Loading';
import useAxiosPrivate from '../../../CustomHook/useAxiosPrivate';
import useAuth from '../../../CustomHook/useAuth';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const axiosPrivate = useAxiosPrivate();
    const { user } = useAuth();

    const { data: paymentInfo = [], refetch, isLoading } = useQuery({
        queryKey: ['paymentInfo', 'users'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/buyerPayment?buyerEmail=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Payment History</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="table-auto w-full text-sm text-left text-gray-500">
                    <thead className="bg-first text-white uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Transaction ID</th>
                            <th className="px-4 py-3">Total Price</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentInfo.map((pay) => (
                            <tr key={pay._id} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-3 font-medium text-gray-800">{pay.transactionId}</td>
                                <td className="px-4 text-second py-3">$ {pay.Price}</td>
                                <td className="px-4 py-3">{pay.date}</td>
                                <td
                                    className={`px-4 py-3 ${
                                        pay.status === 'paid'
                                            ? 'text-first'
                                            : 'text-second'
                                    } font-semibold`}
                                >
                                    {pay.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
