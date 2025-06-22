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
import { MdAdd } from "react-icons/md";
import HelmetSet from "../../../CommonComponent/HelmetSet";
import { Pagination, Stack } from "@mui/material";

const ManageMedicines = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const axiosPrivate = useAxiosPrivate();
    const { user } = useAuth();
     // Pagination states
        const [totalPage, setTotalPage] = useState(1);
        const [currentPage, setCurrentPage] = useState(1);
        const limit = 5; // Per page limit
      
        const pageChange = (event, value) => {
          setCurrentPage(value);
        };

    // Modal open/close korar function
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const axiosPublic = useAxiosPublic();
    const img_key = import.meta.env.VITE_IMG_API_KEY;
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_key}`;

    const { data: categoryData = [], refetch, isLoading } = useQuery({
        queryKey: ['categoryData', 'categoryAll'],
        queryFn: async () => {
            const catInfo = await axiosPrivate.get('/categoryAll');
            if(catInfo){
                return catInfo.data
            }
        }
    });

    const { data: medicinesData = [], refetch: medicinesFetch, isLoading: medicinesLoading } = useQuery({
        queryKey: ['medicinesData', 'medicines',currentPage, limit],
        queryFn: async () => {
            const catInfo = await axiosPrivate.get(`/medicines?sellerEmail=${user?.email}&page=${currentPage}&limit=${limit}`);
           setTotalPage(Math.ceil(catInfo.data.total / limit));
            return catInfo.data.perPageData;
        }
    });

console.log(medicinesData)

    const onSubmit = async (data) => {
        const imgFile = { image: data.photo[0] };
        const result = await axiosPublic.post(img_hosting_api, imgFile, {
            headers: { 'content-type': 'multipart/form-data' }
        });
        data.photo = result.data.data.display_url;
        data.sellerEmail = user?.email;
        data.discountPercentage = parseInt(data.discountPercentage);
        data.Price = parseInt(data.Price);

        if (result.data.success) {
            const res = await axiosPrivate.post('/add-medicines', data);
            if (res.data.acknowledged) {
                closeModal();
                Swal.fire("New medicines Added Successfully!");
                medicinesFetch();
                reset()
                return;
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    if (medicinesLoading) return <Loading />;
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4 ">
            <HelmetSet sub1='Dashboard' sub2='Manage  Medicine'></HelmetSet>
            {/* /pagination  */}
            <div className="flex justify-center my-4">
                    <Stack className="text-first" spacing={2}>
                     <Pagination
                                 className="text-first"
                                 count={totalPage}
                                 page={currentPage}
                                 onChange={pageChange}
                                 sx={{
                         '& .MuiPaginationItem-root': {
                           color: '#85A844',
                           borderColor: '#85A844',
                         },
                         '& .Mui-selected': {
                           backgroundColor: '#85A844',
                           color: 'white',
                         }
                       }}
                             variant="outlined" shape="rounded"   />
                             </Stack>
                  </div>
            {/* Add Medicine Button */}
            <button
                onClick={openModal}
                className="px-4 py-2 md:px-6 md:py-3 font-semibold mb-4 flex items-center gap-3 bg-gradient-to-b from-sky-400 to-sky-500 text-white rounded-sm hover:bg-sky-600 transition-colors text-sm"
            >
                <span>Add Medicines </span><MdAdd size={25} color="white" />
            </button>

            {/* Medicines Table */}
            <div className="overflow-x-auto  bg-white rounded-lg shadow-md">
                <table className="table-auto w-full text-second dark:border-[1px]  dark:border-gray-400">
                    <thead className="bg-sky-400 text-white">
                        <tr className="text-xs md:text-sm ">
                            <th className="px-4 py-2 text-left">Generic Name</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Company</th>
                            <th className="px-4 py-2 text-left">Photo</th>
                            <th className="px-4 py-2 text-left">Mass Unit</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicinesData.map(medicine => (
                            <tr key={medicine._id} className="hover:bg-sky-100 font-semibold transition-colors  text-xs md:text-sm dark:bg-gray-800 dark:text-gray-200 dark:border-[1px]  dark:border-gray-400">
                                <td className="px-4 py-2">{medicine.GenericName}</td>
                                <td className="px-4 py-2">{medicine.category}</td>
                                <td className="px-4 py-2">{medicine.company}</td>
                                <td className="px-4 py-2"><img className="w-12 h-12 object-cover rounded" src={medicine.photo} alt={medicine.GenericName} /></td>
                                <td className="px-4 py-2">{medicine.Massunit}</td>
                                <td className="px-4 py-2">{medicine.Price}/=</td>
                                <td className="px-4 text-center py-2">{medicine.discountPercentage}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Medicine Modal */}
            <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />
                <DialogPanel className="fixed inset-0 flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-bold ">Add New Medicine</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                            {/* Medicine Name & Generic Name */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium  text-gray-700">Item Name</label>
                                    <input
                                        type="text"
                                        placeholder="Item Name"
                                        {...register('ItemName', { required: true })}
                                        className="w-full px-4 py-2 border outline-none rounded focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Item Generic Name</label>
                                    <input
                                        type="text"
                                        placeholder="Item Generic Name"
                                        {...register('GenericName', { required: true })}
                                        className="w-full px-4 py-2 outline-none border rounded focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                            </div>

                            {/* Category & Company */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Select Category</label>
                                    <select {...register('category', { required: true })} defaultValue="Select Category" className="select input-bordered w-full">
                                        <option disabled>Select Category</option>
                                        {categoryData.map(data => (
                                            <option key={data._id} value={data.MedicineCategory}>{data.MedicineCategory}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Select Company</label>
                                    <select {...register('company', { required: true })} className="select input-bordered w-full">
                                        <option disabled>Select Company</option>
                                        <option value="Square Pharmaceuticals Ltd.">Square Pharmaceuticals Ltd.</option>
                                        <option value="Incepta Pharmaceuticals Ltd.">Incepta Pharmaceuticals Ltd.</option>
                                        <option value="Beximco Pharmaceuticals Ltd.">Beximco Pharmaceuticals Ltd.</option>
                                        <option value="Renata Limited">Renata Limited</option>
                                        <option value="Healthcare Pharmaceuticals Ltd.">Healthcare Pharmaceuticals Ltd.</option>
                                    </select>
                                </div>
                            </div>

                            {/* Mass Unit & Price */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Mass Unit</label>
                                    <input
                                        type="text"
                                        {...register('Massunit', { required: true })}
                                        className="w-full px-4 py-2 outline-none border rounded focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        {...register('Price', { required: true })}
                                        className="w-full px-4 outline-none py-2 border rounded focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                            </div>

                            {/* Photo & Discount Percentage */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Item Photo</label>
                                    <input
                                        type="file"
                                        {...register('photo', { required: true })}
                                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                                    <input
                                        type="number"
                                        {...register('discountPercentage', { required: true })}
                                        className="w-full px-4 py-2 border outline-none rounded focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                            </div>

                            <div className="flex  gap-3 justify-end">
                                <button onClick={closeModal} className="bg-thrid px-4 text-white font-semibold py-2">cancel</button>
                                <button type="submit" className="bg-gradient-to-b from-sky-400 to-sky-500 font-semibold text-white py-2 px-6 rounded-sm hover:bg-sky-700">Submit</button>
                            </div>
                        </form>
                    </div>
                </DialogPanel>
            </Dialog>
        </div>
    );
};

export default ManageMedicines;
