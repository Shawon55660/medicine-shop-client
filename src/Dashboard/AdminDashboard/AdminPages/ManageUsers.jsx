import React, { useState } from "react";
import useAxiosPrivate from "../../../CustomHook/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../CommonComponent/Loading";
import useAuth from "../../../CustomHook/useAuth";
import { Pagination, Stack } from "@mui/material";
import Swal from "sweetalert2";
import HelmetSet from "../../../CommonComponent/HelmetSet";

const ManageUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  // Pagination 
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5; 

  const pageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Fetch users with pagination
  const { data: usersData=[], refetch, isLoading} = useQuery({
    queryKey: ["userData", currentPage, limit],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/users?page=${currentPage}&limit=${limit}`);
      setTotalPage(Math.ceil(res.data.total / limit)); 
      return res.data.perPageData;
    },
    
  });

  if (isLoading) return <Loading />;


  const handleChange = async (event, id) => {
    const newRole = event.target.value;
    try {
      const updateRole = await axiosPrivate.patch(`/updateRole/${id}`, { role: newRole });
      if (updateRole.data.modifiedCount) {
       
         Swal.fire("Role updated successfully");
        refetch();
      }
    } catch (err) {
      Swal(err.message);
    }
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <HelmetSet sub1='Dashboard' sub2='Admin | Manage Users'></HelmetSet>
      <div className="flex justify-center my-2">
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
      <h1 className="text-xl md:text-2xl font-bold dark:text-gray-50 text-gray-700 mb-6">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg border-collapse border border-white dark:border-second">
          <thead className="bg-second text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Email</th>
              <th className="px-6 py-3 text-left font-semibold">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.map((users) => (
              <tr key={users._id} className="hover:bg-gray-50 text-gray-800 dark:border-2 dark:border-second dark:bg-gray-800 dark:text-gray-200 transition-colors">
                <td className="px-6 py-4 ">{users.name}</td>
                <td className="px-6 py-4 ">{users.email}</td>
                <td className="px-6 py-4">
                  <select
                    disabled={users.email === user.email }
                    onChange={(event) => handleChange(event, users._id)}
                    value={users.role}
                    className="select w-full border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-second"
                  >
                    <option  value="admin">Admin</option>
                    <option value="seller">Seller</option>
                    <option value="user">User</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
