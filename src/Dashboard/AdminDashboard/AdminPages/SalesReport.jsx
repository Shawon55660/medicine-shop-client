import React, { useRef, useState, useEffect } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Loading from "../../../CommonComponent/Loading";
import useAxiosPrivate from "../../../CustomHook/useAxiosPrivate";
import useAuth from "../../../CustomHook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Stack } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import HelmetSet from "../../../CommonComponent/HelmetSet";

const SalesReport = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const tableRef = useRef(null);
  const [dateRequest, setDateRequest] = useState('')

  // Pagination states
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const pageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Fetch payment data
  const { data: paymentInfo = [], refetch, isLoading } = useQuery({
    queryKey: ["paymentInfo", currentPage, limit,dateRequest],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/payments?page=${currentPage}&limit=${limit}&startDate=${dateRequest.startDate}&endDate=${dateRequest.endDate}`);
      setTotalPage(Math.ceil(res.data.total / limit));
      return res.data.perPageData;
    },
   
  });
  // Filter and calculate total price
  const paidData = paymentInfo.filter((item) => item.status === "paid");
  const totalPrice = paidData.reduce((total, item) => total + item.Price, 0);

  // Data range filter
  const [dataRange, setDateRange] = useState('');
  const handleRange = () => {
    let startDate;
    let endDate = new Date();

    switch(dataRange) {
      case 'yesterday':
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 1);
        break;
      case 'lastWeek':
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'lastMonth':
        startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case 'lastYear':
        startDate = new Date();
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        alert('Please select a valid range');
        return;
    }

    const datePass = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    setDateRequest(datePass); // Update dateRequest with the selected range
  };



  // Show loading spinner while data is being fetched
  if (isLoading) return <Loading />;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <HelmetSet sub1='Dashboard' sub2='Admin | Sales Report'></HelmetSet>
      <div className="flex justify-center">
        <select value={dataRange} onChange={(e) => setDateRange(e.target.value)} className="px-2 py-2 rounded-l-md  text-second outline-none border-[1px] border-second w-full max-w-xs">
          <option value="" disabled>Filter By Date</option>
          <option value="yesterday">Yesterday</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
        </select>
        <button className=" bg-second px-4 py-2 text-white rounded-r-md " onClick={handleRange}><FaSearch /></button>
      </div>

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

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Sales Report</h1>
        <DownloadTableExcel
          filename="sales_report"
          sheet="Sales Data"
          currentTableRef={tableRef.current}
        >
          <button className="px-4 py-2 bg-second text-white rounded shadow">Export to Excel</button>
        </DownloadTableExcel>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table ref={tableRef} className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold">Generic Name</th>
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold">Buyer Email</th>
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold">Seller Email</th>
              <th className="px-4 py-2 border border-gray-300 text-right font-semibold">Price</th>
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {paidData.map((pay, index) => (
              <tr key={pay._id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}>
                <td className="px-4 py-2 border border-gray-300">{pay.GenericName}</td>
                <td className="px-4 py-2 border border-gray-300">{pay.BuyerEmail}</td>
                <td className="px-4 py-2 border border-gray-300">{pay.sellerEmail}</td>
                <td className="px-4 py-2 border border-gray-300 font-semibold text-right">{pay.Price}/=</td>
                <td className={`px-4 py-2 border border-gray-300 ${pay.status === "paid" ? "text-first font-bold" : "text-red-600"}`}>{pay.status}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-bold">
              <td className="px-4 py-2 border border-gray-300"></td>
              <td className="px-4 py-2 border border-gray-300"></td>
              <td className="px-4 py-2 border border-gray-300 text-left">Total Sales:</td>
              <td className="px-4 py-2 border border-gray-300 text-right">{totalPrice}/=</td>
              <td className="px-4 py-2 border border-gray-300">TK</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;
