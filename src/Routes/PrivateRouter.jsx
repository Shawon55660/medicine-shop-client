import React from 'react';
import useAuth from '../CustomHook/useAuth';
import Loading from '../CommonComponent/Loading';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({children  }) => {
    const{laoding,user} = useAuth()
    const location = useLocation();
    if(laoding) return <Loading></Loading>
    if(user) return children
    return <Navigate to="/login" state={location.pathname} replace></Navigate>

};

export default PrivateRouter;