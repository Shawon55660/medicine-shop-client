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
            className="w-full font-semibold justify-center bg-gray-100 text-first gap-3 py-2 px-4 flex items-center rounded-sm hover:bg-first hover:text-white transition duration-200"
          >
          <img src="https://img.icons8.com/?size=30&id=17949&format=png&color=000000" alt="" /><span>continue with google</span>
          </button>
        </div>
    );
};

export default SoicalLogin;
