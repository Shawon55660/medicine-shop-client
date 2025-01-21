import React from 'react';
import useAuth from '../CustomHook/useAuth';
import useAxiosPublic from '../CustomHook/useAxiosPublic';
import { toast } from 'react-toastify';

const SoicalLogin = () => {
    const {loginWithGoogle,setUser} = useAuth()
    const axiosPublic = useAxiosPublic()
    const handleGoogle=()=>{
        loginWithGoogle()
        .then( async res=>{
            setUser(res.user)
           if(res.user){
             toast.success("Profile Update Successfully", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true, 
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            icon: <span style={{ color: "#85A844" }}> <img src="https://img.icons8.com/?size=100&id=59850&format=png&color=85A844" alt="" srcset="" /></span>,
                            style: { backgroundColor: "#FFFFF", color: "#85A844", fontWeight: "bold" }, 
                          });
            const userInfo = {
              email:res.user.email,
              name:res.user.displayName,
              role:'user'
            }
    
             const userData = await axiosPublic.post('/users',userInfo)
               
           
            }
          
           
           
        })
        .catch(error=>{
            alert('login faild')
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
