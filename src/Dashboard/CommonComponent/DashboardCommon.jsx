import React from 'react';
import useRole from '../../CustomHook/useRole';
import { Navigate } from 'react-router-dom';
import Loading from '../../CommonComponent/Loading';
import useAuth from '../../CustomHook/useAuth';

const DashboardCommon = () => {
    const {loading} =  useAuth()
    const [role, isLoading] = useRole()
    if (isLoading || loading) return <Loading></Loading>
    if (role === 'admin') return <Navigate to='/dashboard/AdminHome' />
    if (role === 'seller') return <Navigate to='/dashboard/sellerHome' />
    if (role === 'user') return <Navigate to='/dashboard/payment' />
    
};

export default DashboardCommon;