import React, { useState } from "react";
import useAxiosPrivate from "../../../CustomHook/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../CommonComponent/Loading";
import Swal from "sweetalert2";
import useAuth from "../../../CustomHook/useAuth";
import HelmetSet from "../../../CommonComponent/HelmetSet";

const BannarAdvertise = () => {
   
    const {user} = useAuth()
    const axiosPrivate = useAxiosPrivate()
    
   

  
    const { data: advertisementsData = [], refetch:advertisementsFetch, isLoading:advertisementsLoading } = useQuery({
        queryKey: ['advertisementsData', 'advertisements'],
        queryFn: async () => {
            const catInfo = await axiosPrivate.get('/advertisements-all')
            if (catInfo.data) {
                return catInfo.data
            }
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
        <div className="min-h-screen p-6 mt-2 bg-gray-100">
            <HelmetSet sub1='Dashboard' sub2='Admin | Bannar'></HelmetSet>
              <h1 className="text-xl md:text-2xl font-bold text-gray-700 mb-6">Manage Bannar Advertisements</h1>
           
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-sm text-second font-semibold">

                                <th>Medicine Name </th>
                                <th>Seller Email </th>
                                <th>Bannar Image </th>
                                <th>Description</th>
                                <th>Set Bannar</th>
                               


                            </tr>
                        </thead>
                        <tbody>

                            {advertisementsData.map(advertisment => <tr key={advertisment._id}>
                                
                                <td>{advertisment.medicineName}</td>
                                <td>{advertisment.sellerEmail}</td>
                                <td><img className="w-10 h-10 object-cover" src={advertisment.photo} alt="" /></td>
                                <td>{advertisment.Description.split(" ").slice(0, 5)}...</td>
                                <td><input type="checkbox" className="toggle" onChange={()=>handleBannar(advertisment._id,advertisment.status)}  defaultChecked={advertisment.status=='aceecpt'}/></td>
                               

                            </tr>)}

                        </tbody>

                    </table>
                </div>
            </div>

            

        </div>
    );
};

export default BannarAdvertise;




