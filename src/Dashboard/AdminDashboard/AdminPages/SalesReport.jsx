import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Loading from "../../../CommonComponent/Loading";
import useAxiosPrivate from "../../../CustomHook/useAxiosPrivate";
import useAuth from "../../../CustomHook/useAuth";
import { useQuery } from "@tanstack/react-query";

const SalesReport = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const tableRef = useRef(null);

  // Fetch payment data
  const { data: paymentInfo = [], refetch, isLoading } = useQuery({
    queryKey: ["paymentInfo", "users"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/payments");
      return res.data;
    },
  });

  // Filter and calculate total price
  const paidData = paymentInfo.filter((item) => item.status === "paid");
  const totalPrice = paidData.reduce((total, item) => total + item.Price, 0);

  // Show loading spinner while data is being fetched
  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Sales Report</h1>
        <DownloadTableExcel
          filename="sales_report"
          sheet="Sales Data"
          currentTableRef={tableRef.current}
        >
          <button className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
            Export to Excel
          </button>
        </DownloadTableExcel>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table
          ref={tableRef}
          className="table-auto w-full border-collapse border border-gray-200"
        >
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold">
                Generic Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold">
                Buyer Email
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold">
                Seller Email
              </th>
              <th className="px-4 py-2 border border-gray-300 text-right font-semibold">
                Price
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paidData.map((pay, index) => (
              <tr
                key={pay._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-4 py-2 border border-gray-300">{pay.GenericName}</td>
                <td className="px-4 py-2 border border-gray-300">{pay.BuyerEmail}</td>
                <td className="px-4 py-2 border border-gray-300">{pay.sellerEmail}</td>
                <td className="px-4 py-2 border border-gray-300 text-right">{pay.Price}</td>
                <td
                  className={`px-4 py-2 border border-gray-300 ${
                    pay.status === "paid"
                      ? "text-green-600 font-bold"
                      : "text-red-600"
                  }`}
                >
                  {pay.status}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-bold">
              <td className="px-4 py-2 border border-gray-300"></td>
              <td className="px-4 py-2 border border-gray-300"></td>
              <td className="px-4 py-2 border border-gray-300 text-right">
                Total Sales
              </td>
              <td className="px-4 py-2 border border-gray-300 text-right">
                {totalPrice}
              </td>
              <td className="px-4 py-2 border border-gray-300">TK</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;
