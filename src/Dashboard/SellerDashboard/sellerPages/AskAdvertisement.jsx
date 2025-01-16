import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../../CustomHook/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../CommonComponent/Loading";
import { FaDeleteLeft } from "react-icons/fa6";
import { GrDocumentUpdate } from "react-icons/gr";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../CustomHook/useAxiosPublic";
import useAuth from "../../../CustomHook/useAuth";

const AskAdvertisement = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm()
    const {user} = useAuth()
    const axiosPrivate = useAxiosPrivate()

    // Modal open/close korar function
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const axiosPublic = useAxiosPublic()  
    const img_key = import.meta.env.VITE_IMG_API_KEY;
    const img_hosting_api =`https://api.imgbb.com/1/upload?key=${img_key}`



  
    const { data: advertisementsData = [], refetch:advertisementsFetch, isLoading:advertisementsLoading ,isPending} = useQuery({
        queryKey: ['advertisementsData', 'advertisements'],
        queryFn: async () => {
            const catInfo = await axiosPrivate.get('/advertisements')
            if (catInfo.data) {
                return catInfo.data
            }
        }

    })

    const handleDelete = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPrivate.delete(`/category-delete/${id}`)

                if (res.data) {
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });


                }

            }
            await refetch()
        });

    }


    const onSubmit = async (data) => {
        // reset()
        const imgFile  =  {image:data.photo[0]}
   const result = await axiosPublic.post(img_hosting_api,imgFile,{
    headers: {
      'content-type': 'multipart/form-data'
  }
   })
console.log(result)
   
    data.photo = result.data.data.display_url
    data.status = 'pending'
    data.sellerEmail = user?.email
       if(result.data.success){

        const res = await axiosPrivate.post('/advertisements', data)


        if (res.data.acknowledged) {

            closeModal()
            Swal.fire("New advertisement Added Successfully!");
            advertisementsFetch()
            reset()
            return


        }
       }
       else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
           
          });
       }
       



    };

    // console.log(categoryData)
    if (advertisementsLoading) return <Loading></Loading>
    return (
        <div className="min-h-screen  bg-gray-100">
            {/* Add Category Button */}
            <button
                onClick={openModal}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add Bannar
            </button>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>

                                <th>Bannar Image </th>
                                <th>Description</th>
                                <th>Status</th>
                               


                            </tr>
                        </thead>
                        <tbody>

                            {advertisementsData.map(advertisment => <tr key={advertisment._id}>
                                
                                <td><img className="w-10 h-10 object-cover" src={advertisment.photo} alt="" /></td>
                                <td>{advertisment.Description.split(" ").slice(0, 10)}...</td>
                                <td>{advertisment.status}</td>
                               

                            </tr>)}

                        </tbody>

                    </table>
                </div>
            </div>

            {/* add modal*/}
            <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                {/* Modal Overlay */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-25"
                    aria-hidden="true"
                />
                {/* Modal Content */}
                <DialogPanel className="fixed inset-0 flex items-center overflow-y-auto justify-center p-4">
                    <div className="w-full max-w-xl rounded bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-bold">Add Bannar</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Noto karon category er name input korben.
                        </p>


                        {/* Category Name Input Field */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="">
                            <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" >
                                    medicine Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="medicine Name"

                                        {...register('medicineName', { required: true })}

                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" >
                                   Bannar Image
                                    </label>
                                    <input
                                        type="file"
                                        

                                        {...register('photo', { required: true })}

                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" >
                                        Bannar Description
                                    </label>
                                    <textarea
                                        type="text"
                                        placeholder="Bannar Description"

                                        {...register('Description', { required: true })}

                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                
                            </div>

                            
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button

                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Add Bannar
                                </button>
                            </div>




                        </form>



                        {/* Modal Actions */}

                    </div>
                </DialogPanel>
            </Dialog>

        </div>
    );
};

export default AskAdvertisement;


