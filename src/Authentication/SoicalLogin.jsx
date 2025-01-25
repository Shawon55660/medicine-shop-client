import React from 'react';
import useAuth from '../CustomHook/useAuth';
import useAxiosPublic from '../CustomHook/useAxiosPublic';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const SoicalLogin = () => {
    const {loginWithGoogle,setUser,setLoading} = useAuth()
    const axiosPublic = useAxiosPublic()
    const location  = useLocation()
    const navigate = useNavigate()
    
    const from = location.state?.from?.pathname || "/";

    const handleGoogle=()=>{
      setLoading(true)
        loginWithGoogle()
        .then( async res=>{
            setUser(res.user)
            navigate(from, { replace: true });
           if(res.user){
            
            const userInfo = {
              email:res.user.email,
              name:res.user.displayName,
              role:'user'
            }
    
             toast.success(" Login Successfully", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true, 
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              icon: <span style={{ color: "#85A844" }}> <img src="https://img.icons8.com/?size=100&id=59850&format=png&color=85A844" alt="" srcset="" /></span>,
              style: { backgroundColor: "#FFFFF", color: "#85A844", fontWeight: "bold" }, 
            });
              userData = await axiosPublic.post('/users',userInfo)
             
              
             

         
            
          
               
           
            }
            
          
           
           
        })
       
       
      }
    return (
        <div>
        <button
        onClick={handleGoogle}
            type="submit"
            className="w-full font-semibold justify-center bg-gray-100 text-first gap-3 py-2 px-4 flex items-center rounded-sm hover:bg-first hover:text-white transition duration-200"
          >
          <img src="https://img.icons8.com/?size=30&id=17949&format=png&color=000000" alt="" /><span>continue with google</span>
          </button>
        </div>
    );
};

export default SoicalLogin;
