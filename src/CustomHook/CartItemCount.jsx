import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';
import useAxiosPublic from './useAxiosPublic';

const CartItemCount = () => {
   const { user } = useAuth()
    const axiosPrivate = useAxiosPublic()

    const { data: cartData = [], isLoading: medicinesLoading, refetch } = useQuery({
        queryKey: ['cartData', user?.email],
        
        queryFn: async () => {
            const catInfo = await axiosPrivate.get(`/cartsOwner?userEmail=${user?.email}`)
            if (catInfo.data) {
                return catInfo.data
            }
        }

    })
    return [cartData,medicinesLoading,refetch]
};

export default CartItemCount;