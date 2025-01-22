import React from 'react';
import useAuth from '../CustomHook/useAuth';

import 'jspdf-autotable';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaDownload, FaNotesMedical } from 'react-icons/fa';
import jsPDF from 'jspdf';




const InvoicePage = () => {
  const { paymentInfo } = useAuth();
  const Payment = paymentInfo?.cartData || []; 
  const nvaigate = useNavigate()

  const generatePDF = () => {
   const doc =new jsPDF()
   doc.text('Payment Receipt', 20, 15)
   const tableColumn = ['Serial', 'Item Name', 'Quantity', 'Price', 'Transaction ID'];

   const tableRows = Payment.map((item,index)=>[
    index+1,
    item.ItemName,
    item.quentity,
    item.Price,
   
    paymentInfo?.clientSecret

   ])
   doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });
   doc.save('invoice.pdf');
   Swal.fire({
                           position: "top-center",
                           icon: "success",
                           title: "Payment Receipt Download Successfully",
                           showConfirmButton: false,
                           timer: 2000
                       })
   nvaigate('/shop')

  

  };

  return (
    <div>
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
  <h2 className="text-xl font-semibold mb-4 text-center">Payment Receipt</h2>
  {Payment.map((item, index) => (
    <div key={item._id || index} className="mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Serial</label>
          <input
            type="text"
            value={index + 1}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            value={item.ItemName}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="text"
            value={item.quentity}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            value={`$${item.Price}`}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Buyer Email</label>
          <input
            type="text"
            value={item.userEmail}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
          <input
            type="text"
            value={paymentInfo?.clientSecret}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Download PDF Button */}
    <div className='flex justify-center my-4 gap-3 text-white'>  
      <button onClick={generatePDF}  className='px-4 flex items-center font-semibold gap-2 py-2 rounded-sm bg-first text-center'>
      <FaDownload /><span> payment receipt</span>
      </button>
      <Link to='/shop'><button  className='px-4 flex items-center font-semibold gap-2 py-2 rounded-sm bg-first text-center'>
      <FaNotesMedical size={20}/> <span>shop continue</span>
      </button></Link>
      </div>
    </div>
  );
};

export default InvoicePage;
