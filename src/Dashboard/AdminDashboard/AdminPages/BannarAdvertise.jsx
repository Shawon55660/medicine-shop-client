import React, { useState } from "react";
import useAxiosPrivate from "../../../CustomHook/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../CommonComponent/Loading";
import Swal from "sweetalert2";
import useAuth from "../../../CustomHook/useAuth";
import HelmetSet from "../../../CommonComponent/HelmetSet";
import { Pagination, Stack } from "@mui/material";

const BannarAdvertise = () => {
   
    const {user} = useAuth()
    const axiosPrivate = useAxiosPrivate()
    
       // Pagination states
                const [totalPage, setTotalPage] = useState(1);
                const [currentPage, setCurrentPage] = useState(1);
                const limit = 5; // Per page limit
              
                const pageChange = (event, value) => {
                  setCurrentPage(value);
                };
    
   

  
    const { data: advertisementsData = [], refetch:advertisementsFetch, isLoading:advertisementsLoading } = useQuery({
        queryKey: ['advertisementsData', 'advertisements',currentPage, limit],
        queryFn: async () => {
            const catInfo = await axiosPrivate.get(`/advertisements-all?page=${currentPage}&limit=${limit}`)
            setTotalPage(Math.ceil(catInfo.data.total / limit));
      return catInfo.data.perPageData;
        }

    })
    const handleBannar =async (id,currentSatus)=>{
        
        let status = ''
        if(currentSatus== 'pending'){
             status = 'aceecpt'
           
        }
        else{
            status = 'pending' 
        }
        console.log(status)
       
        const res = await axiosPrivate.patch(`/add-bannar/${id}`,{status:status})
       console.log(res)
        if(res.data.modifiedCount){
             Swal.fire(" Advertisement set  Successfully!");
            advertisementsFetch()
        }

    }

    if (advertisementsLoading) return <Loading></Loading>
    return (
        <div className="min-h-screen p-6 mt-2 bg-gray-100 dark:bg-gray-800">
            <HelmetSet sub1='Dashboard' sub2='Admin | Bannar'></HelmetSet>
            {/* /pagination  */}
            <div className="flex justify-center my-6">
                    <Stack className="text-first" spacing={2}>
                     <Pagination
                                 className="text-first"
                                 count={totalPage}
                                 page={currentPage}
                                 onChange={pageChange}
                                 sx={{
                         '& .MuiPaginationItem-root': {
                           color: '#85A844',
                           borderColor: '#85A844',
                         },
                         '& .Mui-selected': {
                           backgroundColor: '#85A844',
                           color: 'white',
                         }
                       }}
                             variant="outlined" shape="rounded"   />
                             </Stack>
                  </div>
              <h1 className="text-xl md:text-2xl font-bold dark:text-gray-50 text-gray-700 mb-6">Manage Bannar Advertisements</h1>
           
            <div>
                <div className="overflow-x-auto">
                    <table className="table dark:border-[1px]  dark:border-gray-400">
                        {/* head */}
                        <thead className="bg-second text-white">
                            <tr className="text-xs md:text-sm font-semibold">

                                <th>BannarTitle</th>
                                <th>Seller Email </th>
                                <th>Bannar Image </th>
                                <th>Description</th>
                                <th>Set Bannar</th>
                               


                            </tr>
                        </thead>
                        <tbody>

                            {advertisementsData.map(advertisment => <tr className="transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-[1px] text-xs md:text-sm  dark:border-gray-400" key={advertisment._id}>
                                
                                <td>{advertisment.BannarTitle}</td>
                                <td>{advertisment.sellerEmail}</td>
                                <td><img className="w-10 h-10 object-cover" src={advertisment.photo} alt="" /></td>
                                <td>{advertisment.Description.split(" ").slice(0, 5)}...</td>
                                <td><input type="checkbox" className={`${advertisment.status=='aceecpt'? 'dark:text-first ':'dark:text-gray-800'} toggle `} onChange={()=>handleBannar(advertisment._id,advertisment.status)}  defaultChecked={advertisment.status=='aceecpt'}/></td>
                               

                            </tr>)}

                        </tbody>

                    </table>
                </div>
            </div>

            

        </div>
    );
};

export default BannarAdvertise;




