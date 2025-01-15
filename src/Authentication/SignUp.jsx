import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../CustomHook/useAxiosPublic';
import useAuth from '../CustomHook/useAuth';
import { auth } from '../firebase/init';
import { updateProfile } from 'firebase/auth';

const SignUp = () => {
  const {register,handleSubmit,reset} = useForm()
  const axiosPublic = useAxiosPublic()
  const {createUserSignUp,setUser, user,loginWithGoogle} = useAuth()
  console.log(user)

  const img_key = import.meta.env.VITE_IMG_API_KEY;
  const img_hosting_api =`https://api.imgbb.com/1/upload?key=${img_key}`
  const onSubmit =async (data)=>{
 
   const imgFile  =  {image:data.photo[0]}
   const res = await axiosPublic.post(img_hosting_api,imgFile,{
    headers: {
      'content-type': 'multipart/form-data'
  }
   })
   console.log(res.data.data.display_url)
   if(res.data.success){
    const image =  res.data.data.display_url
    createUserSignUp(data.email,data.password)
    .then(userCredential=>{
      setUser(userCredential.user)
      updateProfile(auth.currentUser,{ displayName:data.userName,photoURL: image})
      .then( async(res)=>{
       
       
        setUser({...userCredential.user, displayName:data.userName,photoURL: image})
        const userInfo = {
          email:data.email,
          name:data.userName,
          role:data.role
        }

        const userData = await axiosPublic.post('/users',userInfo)
        if(userData.data){
          reset()
          alert('signUp successfully')

        }
       
        
      })
      .catch(error=>{
        alert('1st  someting is worng')
      })
    })
    .catch(error=>{
      alert( ' 2nd someting is worng')
    })

   }
   

  
    

  }
  const handleGoogle=()=>{
    loginWithGoogle()
    .then(res=>{
        setUser(res.user)
        alert('login with google successfully')
    })
    .catch(error=>{
        alert('login faild')
    })
  }
    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            
            {...register('userName', { required: true })}
          
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
           
            {...register('email', { required: true })}
            
            
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="photo">
            Upload Photo
          </label>
          <input
            type="file"
            id="photo"
         
            accept="image/*"
            {...register('photo', { required: true })}
        
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="role">
            Select Role
          </label>
          <select {...register('role', { required: true })} defaultValue={'role'} className="select  input-bordered w-full ">
                            <option disabled value={'role'} >Select a role</option>
                            <option value='user'>user</option>
                            <option value='seller'>seller</option>
                          
                        </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
           
            {...register('password', { required: true })}
           
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
      <div>
      <button
      onClick={handleGoogle}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
         Google
        </button>
      </div>
    </div>
    );
};

export default SignUp;