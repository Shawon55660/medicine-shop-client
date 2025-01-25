import React, { useState } from 'react';
import Loading from '../../../CommonComponent/Loading';
import useAxiosPrivate from '../../../CustomHook/useAxiosPrivate';
import useAuth from '../../../CustomHook/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Pagination, Stack } from '@mui/material';
import HelmetSet from '../../../CommonComponent/HelmetSet';
import { format } from 'date-fns';

const PaymentManagement = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
      // Pagination states
      const [totalPage, setTotalPage] = useState(1);
      const [currentPage, setCurrentPage] = useState(1);
      const limit = 5; // Per page limit

      const pageChange = (event, value) => {
        setCurrentPage(value);
      };
  // Fetch payment data using React Query
  const {
    data: paymentInfo = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['paymentInfo', 'users',currentPage, limit],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/payments?page=${currentPage}&limit=${limit}`);
      setTotalPage(Math.ceil(res.data.total / limit));
      return res.data.perPageData;
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
    <div className="min-h-screen p-3 bg-gray-100">
      <HelmetSet sub1='Dashboard' sub2='Admin | Payment Management'></HelmetSet>
       <div className="flex justify-center my-2">
        <Stack className="text-first" spacing={2}>
          <Pagination
            className="text-first"
            count={totalPage}
            page={currentPage}
            onChange={pageChange}
            color="success"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
      <h1 className=" text-xl md:text-2xl font-bold text-gray-700 mb-6">Payment Management</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="table-auto w-full border-collapse">
          {/* Table Head */}
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-center">Buyer Email</th>
              <th className="px-4 py-2 text-center">Total Price</th>
              <th className="px-4 py-2 text-center">Date</th>
              <th className="px-4 py-2 text-center">Status</th>
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
                <td className="px-4 text-center py-3">{payment.BuyerEmail}</td>
                <td className="px-4 text-center font-semibold py-3">{payment.Price}/=</td>
                <td className="px-4 text-center py-3">{format(new Date(payment.date), 'PPPP')}</td>
                <td className="px-4 text-center py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-center text-xs font-medium ${
                      payment.status === 'paid'
                        ? 'bg-green-100 text-first'
                        : 'bg-gray-200 text-second'
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
                        ? 'btn '
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
