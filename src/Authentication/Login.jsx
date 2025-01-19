import React from "react";
import useAuth from "../CustomHook/useAuth";
import { useForm } from "react-hook-form";
import SoicalLogin from "./SoicalLogin";
import loginimg from '../../src/assets/Sign in-bro.png'
import { Link } from "react-router-dom";

const Login = () => {
  const { loginWithEmail, setUser } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    loginWithEmail(data.email, data.password)
      .then((res) => {
        setUser(res.user);
        reset();
        alert("Login successfully");
      })
      .catch((error) => {
        alert("Failed to login");
      });
  };

  return (
    <div className="grid  mx-auto gap-4 md:grid-cols-2 justify-center items-center min-h-screen bg-gray-100">
       <div>
        <img className="w-6/12 md:w-9/12 mx-auto" src={loginimg} alt="" />
      </div>
      <div className=" w-8/12 md:w-10/12 lg:w-7/12 mx-auto  bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#85A844]">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#85A844] focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

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
              {...register("password", { required: true })}
              className="w-full px-4 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#85A844] focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

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

       
      </div>
     
    </div>
  );
};

export default Login;
