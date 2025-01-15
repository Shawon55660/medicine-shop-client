import React from 'react';
import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const {user,loading}  = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const {data: role,isLoading} =  useQuery({
        queryKey:[user?.email,'role'],
        enabled: !loading,
        queryFn:async()=>{
            const res  = await axiosPrivate.get(`/users/role/${user?.email}`)
            return res.data?.role
        },
    
    })
    return [role,isLoading]
    
};

export default useRole;