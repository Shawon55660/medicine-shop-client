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

const ManageMedicines = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm()
    const axiosPrivate = useAxiosPrivate()
    const {user} = useAuth()

    // Modal open/close korar function
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const axiosPublic = useAxiosPublic()  
    const img_key = import.meta.env.VITE_IMG_API_KEY;
    const img_hosting_api =`https://api.imgbb.com/1/upload?key=${img_key}`



    const { data: categoryData = [], refetch, isLoading } = useQuery({
        queryKey: ['categoryData', 'category'],
        queryFn: async () => {
            const catInfo = await axiosPrivate.get('/category')
            if (catInfo.data) {
                return catInfo.data
            }
        }

    })
    const { data: medicinesData = [], refetch:medicinesFetch, isLoading:medicinesLoading } = useQuery({
        queryKey: ['medicinesData', 'medicines'],
        queryFn: async () => {
            const catInfo = await axiosPrivate.get(`/medicines?sellerEmail=${user?.email}`)
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
    data.sellerEmail = user?.email
       if(result.data.success){

        const res = await axiosPrivate.post('/add-medicines', data)


        if (res.data.acknowledged) {

            closeModal()
            Swal.fire("New medicines Added Successfully!");
            medicinesFetch()
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
    if (medicinesLoading) return <Loading></Loading>
    return (
        <div className="min-h-screen  bg-gray-100">
            {/* Add Category Button */}
            <button
                onClick={openModal}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add Medicines
            </button>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>

                                <th>GenericName </th>
                                <th>category</th>
                                <th>company</th>
                                <th>Massunit</th>
                                <th>Price</th>
                                <th>discountPercentage</th>


                            </tr>
                        </thead>
                        <tbody>

                            {medicinesData.map(medicines => <tr key={medicines._id}>
                                
                                <td>{medicines.GenericName}</td>
                                <td>{medicines.category}</td>
                                <td>{medicines.company}</td>
                                <td><img className="w-10 h-10 object-cover" src={medicines.photo} alt="" /></td>
                                <td>{medicines.Massunit}</td>
                                <td>{medicines.Price}</td>
                                <td>{medicines.discountPercentage}%</td>

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
                        <h2 className="text-lg font-bold">Add Medicines</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Noto karon category er name input korben.
                        </p>


                        {/* Category Name Input Field */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" >
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Item Name"

                                        {...register('ItemName', { required: true })}

                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" >
                                        Item Generic Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Item Generic Name"

                                        {...register('GenericName', { required: true })}

                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 w-full">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" >
                                        Select Category
                                    </label>

                                    <select {...register('category', { required: true })} defaultValue="Select Category" className="select input-bordered w-full">
                                        <option disabled>Select Category</option>
                                        {categoryData.map((data) => (
                                            <option key={data._id} value={data.MedicineCategory}>
                                                {data.MedicineCategory}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" >
                                        Select Category
                                    </label>

                                    <select {...register('company', { required: true })} defaultValue="Select Company" className="select input-bordered w-full">
                                        <option disabled>Select Company</option>
                                        <option value="Square Pharmaceuticals Ltd.">Square Pharmaceuticals Ltd.</option>
                                        <option value="Incepta Pharmaceuticals Ltd.">Incepta Pharmaceuticals Ltd.</option>
                                        <option value="Beximco Pharmaceuticals Ltd.">Beximco Pharmaceuticals Ltd.</option>
                                        <option value="Renata Limited">Renata Limited</option>
                                        <option value="Healthcare Pharmaceuticals Ltd.">Healthcare Pharmaceuticals Ltd.</option>
                                        <option value="ACI Limited (Advanced Chemical Industries">ACI Limited (Advanced Chemical Industries</option>
                                        <option value="Eskayef Pharmaceuticals Ltd. (SK+F)">Eskayef Pharmaceuticals Ltd. (SK+F)</option>
                                        <option value="Aristopharma Limited">Aristopharma Limited</option>

                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 w-full">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" >
                                        Item Mass Unit
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Item Mass Unit"

                                        {...register('Massunit', { required: true })}

                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"

                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" >
                                        Item Photo
                                    </label>
                                    <input
                                        type="file"


                                        {...register('photo', { required: true })}

                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                            </div>
                            <div className="grid grid-cols-2 gap-2 w-full">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" >
                                        Unit Price
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="per Unit IPrice"

                                        {...register('Price', { required: true })}

                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" >
                                        Discount Percentage
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Discount Percentage "
                                        defaultValue={0}
                                        max={15}

                                        {...register('discountPercentage', { required: false })}

                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" >
                                    Item Description
                                </label>
                                <textarea
                                    type="text"
                                    placeholder="Item Description "

                                    {...register('Description', { required: true })}

                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
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
                                    Add Medicines
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

export default ManageMedicines;

