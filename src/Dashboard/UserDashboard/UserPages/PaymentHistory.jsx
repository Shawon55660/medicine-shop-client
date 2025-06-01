
import Loading from '../../../CommonComponent/Loading';
import useAxiosPrivate from '../../../CustomHook/useAxiosPrivate';
import useAuth from '../../../CustomHook/useAuth';
import { useQuery } from '@tanstack/react-query';
import HelmetSet from '../../../CommonComponent/HelmetSet';
import { format } from 'date-fns';

const PaymentHistory = () => {
    const axiosPrivate = useAxiosPrivate();
    const { user } = useAuth();

    const { data: paymentInfo = [], refetch, isLoading} = useQuery({
        queryKey: ['paymentInfo', 'users'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/buyerPayment?buyerEmail=${user.email}`);
            return res.data;
        },
    });
 

    if (isLoading) return <Loading/>;

    return (
        <div className="p-6 dark:bg-gray-800 bg-gray-50 min-h-screen">
            <HelmetSet sub1='User' sub2='Payment'></HelmetSet>
            <h1 className="text-2xl font-bold text-center mb-6 dark:text-gray-200 text-gray-800">Payment History</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="table-auto w-full text-sm text-left dark:text-gray-200 text-gray-500">
                    <thead className="bg-first text-white dark:text-gray-200 uppercase text-xs">
                        <tr>
                            <th className="px-4 text-center py-3">Transaction ID</th>
                            <th className="px-4 text-center py-3">Total Price</th>
                            <th className="px-4 text-center py-3">Date</th>
                            <th className="px-4 text-center py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentInfo.map((pay) => (
                            <tr key={pay._id} className="border-b dark:hover:text-gray-800  text-gray-800 dark:text-gray-200 hover:bg-gray-100">
                                <td className="px-4 py-3 font-medium text-center ">{pay.transactionId}</td>
                                <td className="px-4   text-center py-3"> {pay.Price} tk</td>
                                <td className="px-4 text-center  py-3">{format(new Date(pay.date), 'PPPP')}</td>
                                <td
                                    className={`px-4 py-3  text-center ${
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
