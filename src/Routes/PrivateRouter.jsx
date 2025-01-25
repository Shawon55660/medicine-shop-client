import React from 'react';
import useAuth from '../CustomHook/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../CommonComponent/Loading';
import useRole from '../CustomHook/useRole';


const PrivateRouter = ({children}) => {
    const{laoding,user} = useAuth()
    const location = useLocation();
 
    if(laoding) return <Loading></Loading>
    if(user) return children
    
    return <Navigate to="/login" state={{from: location}} replace></Navigate>

};

export default PrivateRouter;