import React from 'react';
import useAuth from '../CustomHook/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../CommonComponent/Loading';
import useSeller from '../CustomHook/useSeller';

const SellerRouter = ({children }) => {
    const [isSeller, isSellerLoadin] = useSeller()
    const {user,loading}= useAuth()
    const location = useLocation()
    if(loading || isSellerLoadin) return <Loading></Loading>
    if(user && isSeller) return children
    return <Navigate to='' state={location.pathname}></Navigate>
};

export default SellerRouter;

