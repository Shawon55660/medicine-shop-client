import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../../CustomHook/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../CommonComponent/Loading";
import { FaDeleteLeft } from "react-icons/fa6";
import { GrDocumentUpdate } from "react-icons/gr";
import Swal from "sweetalert2";

const ManageCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const { register, handleSubmit, reset } = useForm()
  const axiosPrivate = useAxiosPrivate()

  // Modal open/close korar function
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [categoryInfo, setCategoryInfo] = useState({})
  const closeModalUpdate = () => setIsOpenUpdate(false);
  const openModalUpdate = async (id) => {

    reset()

    const res = await axiosPrivate.get(`/category/${id}`)
    if (res.data) {

      setCategoryInfo(res.data)


    }
    setIsOpenUpdate(true)



  }



  const { data: categoryData = [], refetch, isLoading } = useQuery({
    queryKey: ['categoryData', 'category'],
    queryFn: async () => {
      const catInfo = await axiosPrivate.get('/category')
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
    reset()
data.quntity = 0

    const res = await axiosPrivate.post('/add-category', data)
    
   
    if (res.data.acknowledged) {

      closeModal()
      Swal.fire("New Category Added Successfully!");
      refetch()
      return

      
    }
    else{
      closeModal()
      Swal.fire(res.data.message)
      refetch()
    }
    


  };
  const handleUpdate= async( e)=>{
   e.preventDefault()
  
   const form = e.target;

  
   const MedicineCategory = form.elements.MedicineCategory.value;
   const categoryPhoto = form.elements.categoryPhoto.value;
  //  const categoryPhoto = form.value.categoryPhoto
   const updateData = {
    MedicineCategory:MedicineCategory,
    categoryPhoto:categoryPhoto
   }
 
   const res = await axiosPrivate.patch(`/update-category/${categoryInfo._id}`,updateData)
   if(res.data){
    closeModalUpdate()
    Swal.fire(" Category updated Successfully!");
    refetch()

   }
  
   

  }
  // console.log(categoryData)
  if (isLoading) return <Loading></Loading>
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

              {categoryData.map(category => <tr key={category._id}>
                <td>{category.MedicineCategory}</td>
                <td>
                  <img className="w-10 object-cover" src={category.categoryPhoto} alt="" />
                </td>
                <td> <button onClick={() => openModalUpdate(category._id)}><GrDocumentUpdate /> </button></td>
                <td><button onClick={() => handleDelete(category._id)}><FaDeleteLeft></FaDeleteLeft></button></td>

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
      {/* updated modal  */}
      <Dialog open={isOpenUpdate} onClose={closeModalUpdate} className="relative z-50">
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
            <form onSubmit={handleUpdate} >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="username">
                  Medicine Category
                </label>
                <input
                  type="text"
              
                  placeholder="Medicine Category"
                  defaultValue={categoryInfo.MedicineCategory}

                 name="MedicineCategory"
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
                  defaultValue={categoryInfo.categoryPhoto}


                  name="categoryPhoto"

                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={closeModalUpdate}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                type="submit"

                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update Category
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
