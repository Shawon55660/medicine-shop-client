import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
const axiosPrivate = axios.create({
    // baseURL: 'https://medi-store-server.vercel.app'
    baseURL: 'http://localhost:8000'
})

const useAxiosPrivate = () => {
const navigate = useNavigate()
const {logOut} = useAuth()
axiosPrivate.interceptors.request.use((config)=>{
    const token = localStorage.getItem('access-token')
    config.headers.authorization = `Bearer ${token}`; 
    return  config
},function(error){
    return Promise.reject(error)
})

axiosPrivate.interceptors.response.use((response)=>{
    return response
},async(error)=>{
    const status = error.response.status
    if(status == 401 ||  status == 403){
        await logOut()
       await navigate('/login')

    }
    return Promise.reject(error)
})

return axiosPrivate

};

export default useAxiosPrivate;