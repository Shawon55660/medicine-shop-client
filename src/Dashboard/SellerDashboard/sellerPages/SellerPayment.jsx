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
    <div className="  min-h-screen bg-gray-100 dark:bg-gray-800 p-4 m-2">
      <HelmetSet sub1='Dashboard' sub2='Payment  History'></HelmetSet>
      {/* Header Section */}
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-second dark:text-gray-50  ">Payment Information</h1>
        <p className="text-sm text-thrid dark:text-gray-50  py-2 md:text-lg">Track your sales transactions and payment status.</p>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table dark:border-[1px]  dark:border-gray-400">
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
              <tr key={pay._id} className="hover:bg-gray-100 transition dark:bg-gray-800 dark:text-gray-200 dark:border-[1px]  dark:border-gray-400">
                <td className="px-6 text-center py-4 text-sm ">{pay.transactionId}</td>
                <td className="px-6 text-center py-4 font-semibold text-sm "> {pay.Price}/=</td>
                <td className="px-6 text-center py-4 text-sm ">{format(new Date(pay.date), 'PPPP')}</td>
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
