import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../../CustomHook/useAxiosPrivate";

const ManageCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
 const {register,handleSubmit,reset} = useForm()
 const axiosPrivate = useAxiosPrivate()

  // Modal open/close korar function
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Input handle korar function
 

  // Submit handle korar function
  const onSubmit = async(data) => {
 
    const res  = await axiosPrivate.post('/add-category',data)
 
  closeModal()
  reset()
  };

  return (
    <div className="min-h-screen  bg-gray-100">
      {/* Add Category Button */}
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Category Name
      </button>

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
