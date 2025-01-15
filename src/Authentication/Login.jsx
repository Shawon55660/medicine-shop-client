import React from 'react';
import useAuth from '../CustomHook/useAuth';
import { useForm } from 'react-hook-form';
import SoicalLogin from './SoicalLogin';

const Login = () => {

    const {loginWithEmail,setUser} = useAuth()
      const {register,handleSubmit,reset} = useForm()
      const onSubmit = (data) =>{
        loginWithEmail(data.email,data.password)
        .then(res=>{
            setUser(res.user)
            reset()
            alert('login successfully')
        })
        .catch(error=>{
            alert('faild to login')
        })
      }
    
    return (
        <div>
         <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            {...register('password', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    <SoicalLogin></SoicalLogin>
    </div>
            
        </div>
    );
};

export default Login;