import React from 'react';
import useAuth from '../CustomHook/useAuth';
import useAxiosPublic from '../CustomHook/useAxiosPublic';

const SoicalLogin = () => {
    const {loginWithGoogle,setUser} = useAuth()
    const axiosPublic = useAxiosPublic()
    const handleGoogle=()=>{
        loginWithGoogle()
        .then( async res=>{
            setUser(res.user)
           if(res.user){
            alert('signUp successfully')
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
           Google
          </button>
        </div>
    );
};

export default SoicalLogin;
