import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../CustomHook/useAxiosPublic";
import useAuth from "../CustomHook/useAuth";
import { auth } from "../firebase/init";
import { updateProfile } from "firebase/auth";
import SoicalLogin from "./SoicalLogin";
import signUp from '../../src/assets/Mobile login-amico.png'
import { Link, useNavigate } from "react-router-dom";
import HelmetSet from "../CommonComponent/HelmetSet";
import { toast, ToastContainer } from "react-toastify";


const SignUp = () => {
  const { register, handleSubmit, reset,formState:{errors} } = useForm();
  const axiosPublic = useAxiosPublic();
  const { createUserSignUp, setUser, user } = useAuth();
  const navigate =useNavigate()

  const img_key = import.meta.env.VITE_IMG_API_KEY;
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_key}`;

  const onSubmit = async (data) => {
    const imgFile = { image: data.photo[0] };
    const res = await axiosPublic.post(img_hosting_api, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const image = res.data.data.display_url;
      createUserSignUp(data.email, data.password)
        .then((userCredential) => {
          setUser(userCredential.user);
          updateProfile(auth.currentUser, {
            displayName: data.userName,
            photoURL: image,
          })
            .then(async () => {
              setUser({
                ...userCredential.user,
                displayName: data.userName,
                photoURL: image,
              });
              const userInfo = {
                email: data.email,
                name: data.userName,
                role: data.role,
              };
              const userData = await axiosPublic.post("/users", userInfo);
              if (userData.data) {
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
                          navigate('/')
              }
            })
            .catch(() => {
              toast.error('something is worng Please try again', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                t
                });
            });
        })
        .catch(() => {
          toast.error('something is worng Please try again', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            t
            });
        });
    }
  };

  return (
    <div className="grid min-h-screen mx-auto gap-8 md:grid-cols-2 items-center bg-gray-100">
       <HelmetSet sub1='MediStore' sub2='SignUp'></HelmetSet>
      {/* Left Section */}
     

<div className="hidden md:block">
  <ToastContainer></ToastContainer>
        <img
          className="w-11/12 mx-auto"
          src={signUp}
          alt="Sign Up"
        />
      </div>

      {/* Right Section */}
  <div className="w-10/12 md:w-12/12 lg:w-9/12 mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#85A844] mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
         <div className="grid grid-cols-2 gap-2">
           {/* Username */}
           <div>
            <label className="block text-sm font-semibold mb-1">User Name</label>
            <input
              type="text"
              {...register("userName", { required: true })}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#85A844]"
              placeholder="Enter your name"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email Address</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#85A844]"
              placeholder="Enter your email"
              required
            />
          </div>

         </div>
         
         <div className="grid grid-cols-2 gap-2">
           {/* Role Selection */}
           <div>
            <label className="block text-sm font-semibold mb-1">Role</label>
            <select
              {...register("role", { required: true })}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#85A844]"
              defaultValue="role"
            >
              <option disabled value="role">
                Select a role
              </option>
              <option value="user">User</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /^(?=.*[!@#$%^&*])/,
                  message: "Password must include at least one special character",
                },
              })}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#85A844]"
              placeholder="Enter your password"
              
            />
                      <p className="text-red-500 text-sm mt-1">
    {errors.password && errors.password.message}
  </p>

          </div>

         </div>
           {/* Upload Photo */}
           <div>
            <label className="block text-sm font-semibold mb-1">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: true })}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#85A844]"
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#85A844] text-white rounded-sm hover:bg-[#729934] transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="divider text-xl text-[#85A844]">or</div>
        {/* Social Login */}
        <SoicalLogin />
        <Link className="underline text-first flex  mt-4 justify-center" to='/login'>Login Here</Link>
      </div>
    </div>
  );
};

export default SignUp;
