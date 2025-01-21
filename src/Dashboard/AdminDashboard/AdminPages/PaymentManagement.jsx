import React from 'react';
import Loading from '../../../CommonComponent/Loading';
import useAxiosPrivate from '../../../CustomHook/useAxiosPrivate';
import useAuth from '../../../CustomHook/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const PaymentManagement = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  // Fetch payment data using React Query
  const {
    data: paymentInfo = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['paymentInfo', 'users'],
    queryFn: async () => {
      const res = await axiosPrivate.get('/payments');
      return res.data;
    },
  });

  // Handle payment confirmation
  const handlePayment = async (id) => {
    const res = await axiosPrivate.patch(`/paymentUpdate/${id}`);
    if (res.data.modifiedCount) {
      await Swal.fire('Payment Confirmed!', '', 'success');
      await refetch();
    }
  };

  // Loading state
  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Payment Management</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="table-auto w-full border-collapse">
          {/* Table Head */}
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Buyer Email</th>
              <th className="px-4 py-2 text-left">Total Price</th>
              <th className="px-4 py-2 text-left">Data</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {paymentInfo.map((payment) => (
              <tr
                key={payment._id}
                className=" transition-colors border-b"
              >
                <td className="px-4 py-3">{payment.BuyerEmail}</td>
                <td className="px-4 py-3">{payment.Price}</td>
                <td className="px-4 py-3">{payment.GenericName}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handlePayment(payment._id)}
                    disabled={payment.status === 'paid'}
                    className={`btn ${
                      payment.status === 'paid'
                        ? 'btn'
                        : 'bg-first text-white'
                    }`}
                  >
                    Accept Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;
