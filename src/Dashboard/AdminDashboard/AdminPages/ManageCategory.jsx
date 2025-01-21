import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../../CustomHook/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../CommonComponent/Loading";
import { FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";

const ManageCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const axiosPrivate = useAxiosPrivate();
  const [categoryInfo, setCategoryInfo] = useState({});

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeModalUpdate = () => setIsOpenUpdate(false);

  const openModalUpdate = async (id) => {
    reset();
    const res = await axiosPrivate.get(`/category/${id}`);
    if (res.data) {
      setCategoryInfo(res.data);
    }
    setIsOpenUpdate(true);
  };

  const { data: categoryData = [], refetch, isLoading } = useQuery({
    queryKey: ["categoryData", "category"],
    queryFn: async () => {
      const catInfo = await axiosPrivate.get("/category");
      if (catInfo.data) {
        return catInfo.data;
      }
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPrivate.delete(`/category-delete/${id}`);
        if (res.data) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
        refetch();
      }
    });
  };

  const onSubmit = async (data) => {
    reset();
    data.quantity = 0;
    const res = await axiosPrivate.post("/add-category", data);
    if (res.data.acknowledged) {
      closeModal();
      Swal.fire("New Category Added Successfully!");
      refetch();
    } else {
      closeModal();
      Swal.fire(res.data.message);
      refetch();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const MedicineCategory = form.elements.MedicineCategory.value;
    const categoryPhoto = form.elements.categoryPhoto.value;
    const updateData = { MedicineCategory, categoryPhoto };
    const res = await axiosPrivate.patch(
      `/update-category/${categoryInfo._id}`,
      updateData
    );
    if (res.data) {
      closeModalUpdate();
      Swal.fire("Category updated Successfully!");
      refetch();
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Manage Categories</h1>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-second text-white rounded shadow hover:bg-blue-600"
        >
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table-auto w-full">
          <thead className="bg-second text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Category Name</th>
              <th className="px-6 py-3 text-left font-semibold">Category Photo</th>
              <th className="px-6 py-3 text-center font-semibold">Update</th>
              <th className="px-6 py-3 text-center font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody>
            {categoryData.map((category) => (
              <tr
                key={category._id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="px-6 py-4">{category.MedicineCategory}</td>
                <td className="px-6 py-4">
                  <img
                    src={category.categoryPhoto}
                    alt="Category"
                    className="w-10 h-10 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => openModalUpdate(category._id)}
                    className="text-blue-600 hover:underline flex items-center justify-center"
                  >
                    <GrUpdate className="mr-1" />
                    Update
                  </button>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-600 hover:underline flex items-center justify-center"
                  >
                    <FaTrashAlt className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <DialogPanel className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Category Name</label>
                <input
                  {...register("MedicineCategory", { required: true })}
                  type="text"
                  placeholder="Enter category name"
                  className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Category Photo</label>
                <input
                  {...register("categoryPhoto", { required: true })}
                  type="text"
                  placeholder="Enter photo URL"
                  className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </Dialog>

      {/* Update Modal */}
      <Dialog open={isOpenUpdate} onClose={closeModalUpdate} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <DialogPanel className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Update Category</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Category Name</label>
                <input
                  type="text"
                  name="MedicineCategory"
                  defaultValue={categoryInfo.MedicineCategory}
                  className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Category Photo</label>
                <input
                  type="text"
                  name="categoryPhoto"
                  defaultValue={categoryInfo.categoryPhoto}
                  className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModalUpdate}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default ManageCategory;
