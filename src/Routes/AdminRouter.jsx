import React from 'react';
import useAdmin from '../CustomHook/useAdmin';
import useAuth from '../CustomHook/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../CommonComponent/Loading';

const AdminRouter = ({children }) => {
    const [isAdmin, isAdminLoading] = useAdmin()
    const {user,loading}= useAuth()
    const location = useLocation()
    if(loading || isAdminLoading) return <Loading></Loading>
    if(user && isAdmin) return children
    return <Navigate to='' state={location.pathname}></Navigate>
};

export default AdminRouter;