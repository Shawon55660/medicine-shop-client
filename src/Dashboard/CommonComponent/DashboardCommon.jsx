import React from 'react';
import useRole from '../../CustomHook/useRole';
import { Navigate } from 'react-router-dom';

const DashboardCommon = () => {
    const [role, isLoading] = useRole()
    if (isLoading) return <LoadingSpinner />
    if (role === 'admin') return <Navigate to='/dashboard/AdminHome' />
    if (role === 'seller') return <Navigate to='/dashboard/sellerHome' />
    if (role === 'user') return <Navigate to='/dashboard/payment' />
    
};

export default DashboardCommon;