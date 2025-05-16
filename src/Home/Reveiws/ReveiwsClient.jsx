import React from "react";
import Header from "../../CommonComponent/Header";
import useAxiosPublic from "../../CustomHook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { format } from "date-fns";

const ReveiwsClient = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reveiwsData = [], refetch, isLoading } = useQuery({
    queryKey: ["reveiwsData"],
    queryFn: async () => {
      const reeiwsInfo = await axiosPublic.get("/clientReveiws-get");
      if (reeiwsInfo.data) {
        return reeiwsInfo.data;
      }
      refetch();
    },
  });

  return (
    <div>
      <Header
        title="Reviews"
        subTitle=" Hear from Our Happy Customers"
        details="At Medistore, we believe in the power of customer feedback. Our Reviews Section is where you can hear directly from those who have experienced our products and services. "
      />
      <Swiper
      className="h-full"
        slidesPerView={2}
        
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        
      >
        {reveiwsData.map((info) => (
          <SwiperSlide
            
            key={info._id}
          >
            <div className="flex my-8 flex-col  bg-white dark:bg-second  shadow-xl rounded-2xl p-6 border border-gray-300 transition-transform transform hover:scale-105 duration-300">
            <div className="md:flex items-center gap-4 flex-grow ">
              <img
                src={info.clientPhoto}
                alt={info.clientName}
                className="w-10 h-10 rounded-full border-2 object-cover  shadow-md"
              />
              <div>
                <h3 className="text-xs font-bold dark:text-white text-gray-900">{info.clientName}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-200">{format(new Date(info.reviewDate), "PPP")}</p>
              </div>
            </div>
            <p className="mt-4 flex-grow text-gray-700 dark:text-white w-full  text-base italic md:p-2">
              {info.ClientReview}
            </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReveiwsClient;
