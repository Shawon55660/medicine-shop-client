import React, { useState } from 'react';
import useAxiosPrivate from '../../../CustomHook/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../CommonComponent/Loading';
import useAuth from '../../../CustomHook/useAuth';

const ManageUsers = () => {
    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()

    const { data: userData, refetch, isLoading } = useQuery({
        queryKey: ['userData', 'users'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/users')
            return res.data
        }
    })
    if (isLoading) return <Loading></Loading>
    const handleChange = async (event, id) => {
        const newRole = event.target.value
        const updateRole = await axiosPrivate.patch(`/updateRole/${id}`, { role: newRole })
        console.log(updateRole)
        if (updateRole.data.modifiedCount) {
            alert('role updated successfully')
            refetch()

        }
    }


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Email</th>

                            <th>Change Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map(users => <tr key={user._id}>


                            <td>
                                {users.name}

                            </td>
                            <td>{users.email}</td>

                            <th>
                                <select disabled={users.email == user.email && users.role == 'admin' && true} onChange={(event) => handleChange(event, users._id)} value={users.role} className="select  input-bordered w-full ">

                                    <option disabled={users.role == 'admin'} className={users.role == 'admin' && 'text-red-500'} value="admin">admin</option>

                                    <option disabled={users.role == 'seller'} className={users.role == 'seller' && 'text-red-500'} value="seller">seller</option>
                                    <option disabled={users.role == 'user'} className={users.role == 'user' && 'text-red-500'} value="user">user </option>



                                </select>

                            </th>
                        </tr>)}


                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default ManageUsers;