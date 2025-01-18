import React from 'react';
import useAuth from '../CustomHook/useAuth';

import pdfMake from 'pdfmake/build/pdfmake';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';




const InvoicePage = () => {
  const { paymentInfo } = useAuth();
  const Payment = paymentInfo?.cartData || []; 
  const nvaigate = useNavigate()

  const generatePDF = () => {
  
    const docDefinition = {
      content: [
        {
          table: {
            headerRows: 1,
            widths: [50, '*', 'auto', 'auto', 'auto', 'auto'],
            body: [
           
              ['Serial', 'Item Name', 'Quantity', 'Price', 'Buyer Email', 'Transaction ID'],
           
              ...Payment.map((item, index) => [
                index + 1,
                item.ItemName,
                item.quentity,
                item.Price,
                item.userEmail,
                paymentInfo?.clientSecret,
              ]),
            ],
          },
        },
      ],
    };

  
    pdfMake.createPdf(docDefinition).download('invoice.pdf');
    Swal.fire('download successfully')
    nvaigate('/')

  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Buyer Email</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {Payment.map((item, index) => (
              <tr key={item._id || index}>
                <th>{index + 1}</th>
                <td>{item.ItemName}</td>
                <td>{item.quentity}</td>
                <td>{item.Price}</td>
                <td>{item.userEmail}</td>
                <td>{paymentInfo?.clientSecret}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download PDF Button */}
      <button onClick={generatePDF} className="btn btn-primary mt-3">
        Download as PDF
      </button>
    </div>
  );
};

export default InvoicePage;
