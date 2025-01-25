import React from "react";
import Loading from "../../../CommonComponent/Loading";
import useAxiosPrivate from "../../../CustomHook/useAxiosPrivate";
import useAuth from "../../../CustomHook/useAuth";
import { useQuery } from "@tanstack/react-query";
import HelmetSet from "../../../CommonComponent/HelmetSet";
import { format } from "date-fns";

const SellerPayment = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const { data: paymentInfo = [], refetch, isLoading } = useQuery({
    queryKey: ["paymentInfo", "users"],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/sellerSelling?sellerEmail=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 mx-5 my-2 min-h-screen bg-gray-50">
      <HelmetSet sub1='Dashboard' sub2='Payment  History'></HelmetSet>
      {/* Header Section */}
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-second">Payment Information</h1>
        <p className="text-sm text-thrid py-1 md:text-lg">Track your sales transactions and payment status.</p>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-b from-sky-400 to-sky-500 text-white">
            <tr>
              <th className="px-6 py-3 text-center text-sm font-medium uppercase">Transaction ID</th>
              <th className="px-6 py-3 text-center text-sm font-medium uppercase">Total Price</th>
              <th className="px-6 py-3 text-center text-sm font-medium uppercase">Date</th>
              <th className="px-6 py-3 text-center text-sm font-medium uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paymentInfo.map((pay) => (
              <tr key={pay._id} className="hover:bg-gray-100 transition">
                <td className="px-6 text-center py-4 text-sm text-gray-700">{pay.transactionId}</td>
                <td className="px-6 text-center py-4 font-semibold text-sm text-gray-700"> {pay.Price}/=</td>
                <td className="px-6 text-center py-4 text-sm text-gray-700">{format(new Date(pay.date), 'PPPP')}</td>
                <td
                  className={`px-6 text-center py-4 text-sm font-semibold ${
                    pay.status === "paid"
                      ? "text-first"
                      : pay.status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
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

export default SellerPayment;
