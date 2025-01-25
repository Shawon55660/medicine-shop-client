import React from 'react';
import useAuth from '../CustomHook/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../CommonComponent/Loading';
import useSeller from '../CustomHook/useSeller';
import useRole from '../CustomHook/useRole';

const SellerRouter = ({children }) => {

    const [isSeller, isSellerLoading] = useSeller()
    const {user,loading}= useAuth()
    const location = useLocation()
 
    
   
    if(loading || isSellerLoading) return <Loading></Loading>
    if(user && isSeller) return children
  return <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
};

export default SellerRouter;

