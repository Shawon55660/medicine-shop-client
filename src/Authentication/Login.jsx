import React, { useState } from "react";
import useAuth from "../CustomHook/useAuth";
import { useForm } from "react-hook-form";
import SoicalLogin from "./SoicalLogin";
import loginimg from '../../src/assets/Sign in-bro.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import HelmetSet from "../CommonComponent/HelmetSet";
import { toast, ToastContainer } from "react-toastify";


const Login = () => {
  const { loginWithEmail, setUser } = useAuth();
  const { register, handleSubmit, reset, formState: { errors }} = useForm();
  const location = useLocation()
  const navigate = useNavigate()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const handleUserAutoFill = ()=>{
   
    setEmail('rohan@gmail.com')
    setPassword('123456@')
  }
  const handleSellerAutoFill = ()=>{
    setEmail('riad@gmail.com')
    setPassword('123456@')
  }
  const handleAdminAutoFill = ()=>{
    setEmail('shawon@gmail.com')
    setPassword('123456@')
  }
 

    const from = location.state?.from?.pathname || "/";
    

  const onSubmit = (data) => {
    loginWithEmail(data.email, data.password)
      .then((res) => {
        setUser(res.user);
        reset();
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
        navigate(from, { replace: true });

      })
      .catch((error) => {
        toast.error('something is worng Please try again', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
        });
      });
     
  };

  return (
    <div className="grid  mx-auto gap-4 md:grid-cols-2 justify-center items-center min-h-screen bg-gray-100">
      <HelmetSet sub1='MediStore' sub2='Login'></HelmetSet>
     
      <div>
      <ToastContainer></ToastContainer>
        <img className="w-6/12 md:w-9/12 mx-auto" src={loginimg} alt="" />
      </div>
      <div className=" w-9/12 md:w-10/12 lg:w-7/12 mx-auto  bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#85A844]">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              
              {...register("email", { required: 'Enter your Email' })}
              className="w-full px-4 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#85A844] focus:border-transparent"
              placeholder="Enter your email"
              value={email || null}
            
            />
          </div>
          <p className="text-red-500 text-sm mt-1">
    {errors.email && errors.email.message}
  </p>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              
              {...register("password", {
                required: "Password is required",
                
              })}
              className="w-full px-4 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#85A844] focus:border-transparent"
              placeholder="Enter your password"
              value={password || null}
              
            />
          
          </div>
          <p className="text-red-500 text-sm mt-1">
    {errors.password && errors.password.message}
  </p>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full bg-[#85A844] text-white py-2 px-4 rounded-sm hover:bg-[#729934] focus:outline-none focus:ring-2 focus:ring-[#85A844] focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
        </form>
        <div className="divider text-first text-xl">or</div>

        {/* Social Login */}
        <div className="my-2">
          <SoicalLogin />


        </div>
        <Link className="underline text-first flex justify-center" to='/signUp'>Register Here</Link>
        <div className="my-4 justify-center flex gap-2">
          <button onClick={handleUserAutoFill} className="bg-first text-sm text-white py-1 rounded-sm px-2">User Autofill</button>
          <button onClick={handleSellerAutoFill} className="bg-first text-sm text-white py-1 rounded-sm px-2">Seller Autofill</button>
          <button onClick={handleAdminAutoFill} className="bg-first text-sm text-white py-1 rounded-sm px-2">Admin Autofill</button>
        </div>


      </div>

    </div>
  );
};

export default Login;
