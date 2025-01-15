import axios from 'axios';
import React from 'react';
const axiosPrivate = axios.create({
    baseURL: 'http://localhost:8000/'
})

const useAxiosPrivate = () => {
   return axiosPrivate
};

export default useAxiosPrivate;