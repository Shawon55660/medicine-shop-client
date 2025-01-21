import React from "react";
import useAxiosPrivate from "../../../CustomHook/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../CommonComponent/Loading";
import useAuth from "../../../CustomHook/useAuth";

const ManageUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const { data: userData = [], refetch, isLoading } = useQuery({
    queryKey: ["userData", "users"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const handleChange = async (event, id) => {
    const newRole = event.target.value;
    const updateRole = await axiosPrivate.patch(`/updateRole/${id}`, { role: newRole });
    if (updateRole.data.modifiedCount) {
      alert("Role updated successfully!");
      refetch();
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg border-collapse border border-gray-200">
          {/* Table Header */}
          <thead className="bg-second text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Email</th>
              <th className="px-6 py-3 text-left font-semibold">Change Role</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {userData.map((users) => (
              <tr key={users._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-700">{users.name}</td>
                <td className="px-6 py-4 text-gray-700">{users.email}</td>
                <td className="px-6 py-4">
                  <select
                    disabled={
                      users.email === user.email && users.role === "admin"
                    }
                    onChange={(event) => handleChange(event, users._id)}
                    value={users.role}
                    className="select w-full border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300"
                  >
                    <option
                      disabled={users.role === "admin"}
                      value="admin"
                      className={users.role === "admin" ? "text-red-500" : ""}
                    >
                      Admin
                    </option>
                    <option
                      disabled={users.role === "seller"}
                      value="seller"
                      className={users.role === "seller" ? "text-red-500" : ""}
                    >
                      Seller
                    </option>
                    <option
                      disabled={users.role === "user"}
                      value="user"
                      className={users.role === "user" ? "text-red-500" : ""}
                    >
                      User
                    </option>
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
