import React from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useCartItem = () => {
      const { user,loading } = useAuth()
      const axiosPrivate = useAxiosPrivate()
  
      const { data: cartData = [], isLoading: medicinesLoading, refetch } = useQuery({
          queryKey: ['cartData', user?.email],
          enabled: !loading,
          queryFn: async () => {
              const catInfo = await axiosPrivate.get(`/cartsOwner?userEmail=${user?.email}`)
              if (catInfo.data) {
                  return catInfo.data
              }
          }
  
        
      })
      return [cartData,medicinesLoading,refetch]
};

export default useCartItem;