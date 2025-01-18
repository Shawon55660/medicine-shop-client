import React, {useRef} from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Loading from '../../../CommonComponent/Loading';
import useAxiosPrivate from '../../../CustomHook/useAxiosPrivate';
import useAuth from '../../../CustomHook/useAuth';
import { useQuery } from '@tanstack/react-query';




const SalesReport = () => {

   
    const axiosPrivate = useAxiosPrivate();
    const { user } = useAuth();
    const tableRef = useRef(null);

    const { data: paymentInfo = [], refetch, isLoading } = useQuery({
        queryKey: ['paymentInfo', 'users'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/payments');
            return res.data;
        },
    });

    const paidData = paymentInfo.filter((item) => item.status === 'paid');
    const totalPrice = paidData.reduce((total, item) => total + item.Price, 0);

   
    if (isLoading) return <Loading />;

    return (
        <div>
            <div className="overflow-x-auto">
                <table  ref={tableRef} className="table">
                    <thead>
                        <tr>
                            <th>GenericName</th>
                            <th>Buyer Email</th>
                            <th>Seller Email</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paidData.map((pay) => (
                            <tr key={pay._id}>
                                <td>{pay.GenericName}</td>
                                <td>{pay.BuyerEmail}</td>
                                <td>{pay.sellerEmail}</td>
                                <td>{pay.Price}</td>
                                <td>{pay.status}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Total Sales</td>
                            <td>{totalPrice}</td>
                            <td>tk</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                   <button className='btn btn-primary'> Export excel </button>

                </DownloadTableExcel>
          
        </div>
    );
};

export default SalesReport;
