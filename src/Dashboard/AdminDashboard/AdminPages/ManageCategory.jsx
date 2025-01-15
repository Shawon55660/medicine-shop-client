import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../../CustomHook/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../CommonComponent/Loading";
import { FaDeleteLeft } from "react-icons/fa6";
import { GrDocumentUpdate } from "react-icons/gr";

const ManageCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
 const {register,handleSubmit,reset} = useForm()
 const axiosPrivate = useAxiosPrivate()

  // Modal open/close korar function
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const {data:categoryData=[],refetch,isLoading} = useQuery({
    queryKey:['categoryData','category'],
    queryFn: async()=>{
        const categoryInfo = await axiosPrivate.get('/category')
      if (categoryInfo.data){
        return categoryInfo.data
      }
    }

})

 

  // Submit handle korar function
  const onSubmit = async(data) => {
 
 
   
    const res  = await axiosPrivate.post('/add-category',data)
    if(res.data.acknowledged){
       
        closeModal()
        alert('category added successfully')
        refetch()
     
        reset()
    }
 

  };
// console.log(categoryData)
if(isLoading) return <Loading></Loading>
  return (
    <div className="min-h-screen  bg-gray-100">
      {/* Add Category Button */}
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Category Name
      </button>
      <div>
      <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Category Name</th>
                            <th>Category Photo</th>
                            <th>Category Update</th>
                            <th>Category Delete</th>

                           
                        </tr>
                    </thead>
                    <tbody>
                        
                  {categoryData.map(category=> <tr key={category._id}>
                    <td>{category.MedicineCategory}</td>
                    <td>
                        <img className="w-10 object-cover" src={category.categoryPhoto} alt="" />
                    </td>
                    <td><FaDeleteLeft></FaDeleteLeft></td>
                    <td><GrDocumentUpdate /></td>
                 
                  </tr> )}

                    </tbody>

                </table>
            </div>
      </div>

      {/* Modal Component */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        {/* Modal Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-25"
          aria-hidden="true"
        />
        {/* Modal Content */}
        <DialogPanel className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
            <h2 className="text-lg font-bold">Add Category</h2>
            <p className="mt-2 text-sm text-gray-600">
              Noto karon category er name input korben.
            </p>
        

            {/* Category Name Input Field */}
            <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="username">
            Medicine Category
          </label>
          <input
            type="text"
            id="username"
            placeholder="Medicine Category"
            
            {...register('MedicineCategory', { required: true })}
          
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
       
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="photo">
          Category Photo
          </label>
          <input
            type="text"
            id="photo"
            placeholder="Category Photo"
         
           
            {...register('categoryPhoto', { required: true })}
        
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Add Category
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

export default ManageCategory;
