import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../../CustomHook/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../CommonComponent/Loading";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../CustomHook/useAxiosPublic";
import useAuth from "../../../CustomHook/useAuth";
import { MdAdd } from "react-icons/md";
import HelmetSet from "../../../CommonComponent/HelmetSet";
import { Pagination, Stack } from "@mui/material";

const AskAdvertisement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
   // Pagination states
          const [totalPage, setTotalPage] = useState(1);
          const [currentPage, setCurrentPage] = useState(1);
          const limit = 5; // Per page limit
        
          const pageChange = (event, value) => {
            setCurrentPage(value);
          };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const axiosPublic = useAxiosPublic();
  const img_key = import.meta.env.VITE_IMG_API_KEY;
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_key}`;

  const {
    data: advertisementsData = [],
    refetch: advertisementsFetch,
    isLoading: advertisementsLoading,
  } = useQuery({
    queryKey: ["advertisementsData", "advertisements",currentPage, limit],
    queryFn: async () => {
      const catInfo = await axiosPrivate.get(`/advertisements?sellerEmail=${user.email}&page=${currentPage}&limit=${limit}`);
      setTotalPage(Math.ceil(catInfo.data.total / limit));
            return catInfo.data.perPageData;
        
    },
  });

  const onSubmit = async (data) => {
    const imgFile = { image: data.photo[0] };
    const result = await axiosPublic.post(img_hosting_api, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (result.data.success) {
      data.photo = result.data.data.display_url;
      data.status = "pending";
      data.sellerEmail = user?.email;

      const res = await axiosPrivate.post("/advertisements", data);

      if (res.data.acknowledged) {
        closeModal();
        Swal.fire("New advertisement added successfully!");
        advertisementsFetch();
        reset();
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

  if (advertisementsLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4 ">
      <HelmetSet sub1='Dashboard' sub2='Bannar Add'></HelmetSet>
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
     
     <div  className="flex-col flex md:flex-row  justify-between my-4 md:items-center">
     <div className=" ">
        <h1 className="text-2xl lg:text-3xl font-bold text-second dark:text-gray-50 ">Manage Advertisements</h1>
        <p className="text-xs text-thrid dark:text-gray-50  py-2 md:text-sm">Submit and track your advertisement requests.</p>
      </div>

     <div>
     <button
        onClick={openModal}
        className="md:px-6 md:py-3  px-4 py-2 flex items-center font-semibold gap-3 justify-center text-white bg-gradient-to-b from-sky-400 to-sky-500 rounded-sm shadow hover:bg-sky-700 transition"
      >
        <span>Request New Banner</span> <MdAdd size={25} color="white" />
      </button>
     </div>
     </div>


      <div className="">
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table dark:border-[1px]  dark:border-gray-400">
            <thead className="bg-gradient-to-b from-sky-400 to-sky-500 text-white">
              <tr className="text-xs md:text-sm text-center">
                <th className="px-6 py-3  text-sm font-medium uppercase">Image</th>
                <th className="px-6 py-3  text-sm font-medium uppercase">Description</th>
                <th className="px-6 py-3  text-sm font-medium uppercase">Status</th>
              </tr>
            </thead>
            <tbody >
              {advertisementsData.map((advertisement) => (
                <tr className="hover:bg-gray-100 transition dark:bg-gray-800 dark:text-gray-200 dark:border-[1px] text-xs md:text-sm  dark:border-gray-400 text-center" key={advertisement._id}>
                  <td  className="px-4 py-2 flex justify-center items-center"><img className="w-12 h-12 object-cover rounded"
                      src={advertisement.photo}
                      
                    />
                  </td>
                  <td className="px-6  text-sm ">
                    {advertisement.Description.split(" ").slice(0, 10).join(" ")}...
                  </td>
                  <td className="px-6  text-sm font-semibold capitalize text-first">
                    {advertisement.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
        <DialogPanel className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-lg p-6">
            <h2 className="text-xl font-bold text-sky-600">Submit Banner Request</h2>
            <p className="text-sm text-gray-500 mt-1">
              Provide details for the advertisement banner.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Banner Title</label>
                <input
                  type="text"
                  placeholder="Enter banner title"
                  {...register("BannarTitle", { required: true })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Banner Image</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  placeholder="Enter banner description"
                  {...register("Description", { required: true })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2  bg-gray-200 rounded-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-sm text-white bg-gradient-to-b from-sky-400 to-sky-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default AskAdvertisement;
