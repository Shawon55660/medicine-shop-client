import React from "react";

import useAuth from "../CustomHook/useAuth";
import updateImg from '../../src/assets/Portfolio Update-bro.png'
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/init";
import useAxiosPublic from "../CustomHook/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HelmetSet from "../CommonComponent/HelmetSet";


const UpdateProfile = () => {
 
    const {user,setUser,setLoading,loading} =useAuth()
    
    const axiosPublic = useAxiosPublic()
 const navigate =useNavigate()


  const onSubmit =async (e) => {
 

    e.preventDefault();
  
    const from = e.target;
    const userName = from.userName.value;
    const photoURL = from.photo.value;
    console.log(photoURL)
     
        updateProfile(auth.currentUser,{displayName: userName, photoURL:photoURL})
        .then(res=>{
          
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
            console.log(user)
            // navigate('/shop')
            setUser({...auth.currentUser,displayName: userName, photoURL: photoURL})
          

         
        })
        .catch(err=>{
            alert('error')
        })
        console.log(user)

    

   
 
   
  };

console.log(user)
  return (
    <div className="container mx-auto ">
       <HelmetSet sub1='MediStore' sub2='UpdateProfile'></HelmetSet>

      
      <div className="grid lg:grid-cols-2 gap-2  items-center">
    <div className="w-9/12 mx-auto p-4 bg-white shadow-md rounded-lg"> 
        <div className="mx-auto flex flex-col gap-2 justify-center items-center"><img className=" border-4 w-40 object-cover h-40 rounded-full border-first " src={user?.photoURL} alt="" /><p className="font-semibold text-first">{user?.displayName}</p> <h2 className="text-first  uppercase  text-2xl font-semibold">Update Profile</h2></div>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* User Name */}
        <div>
          <label className="block text-first font-semibold mb-1">User Name</label>
          <input
           name='userName'
            defaultValue={user?.displayName}
            className="w-full border border-first outline-none  px-3 py-2 rounded-md"
          />
         
        </div>
         {/* User email */}
         <div>
          <label className="block text-first font-semibold mb-1">User Email</label>
          <input
           
            defaultValue={user?.email}
            readOnly
            className="w-full border border-first outline-none  px-3 py-2 rounded-md"
          />
         
        </div>

 
         
        {/* Profile Photo */}
        <div>
          <label className="block text-first font-semibold mb-1">Profile Photo</label>
          <input
            type="text"
            defaultValue={user?.photoURL}
            name="photo"
           
            className="w-full outline-none border border-first px-3 py-2 rounded-md"
          />
         
        </div>

      <div className="flex gap-6 pt-4">
      
        <button
          type="submit"
          className="w-full bg-first text-white py-2 rounded-md hover:bg-[#85A830]"
        >
          Change Update
        </button>

      </div>
      </form>
       </div>
        <div>
            <img className="w-10/12 mx-auto" src={updateImg} alt="" />

        </div>
      </div>

    </div>
  );
};

export default UpdateProfile;


