import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'



// import required modules
import { Navigation } from 'swiper/modules';import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../CustomHook/useAxiosPrivate';
import { Link } from 'react-router-dom';
;

const Bannar = () => {

    const axiosPrivate = useAxiosPrivate()
    const { data: advertisementsData = [], refetch:advertisementsFetch, isLoading:advertisementsLoading } = useQuery({
        queryKey: ['advertisementsData', 'advertisements'],
        queryFn: async () => {
            const catInfo = await axiosPrivate.get('/advertisements-all')
            if (catInfo.data) {
                return catInfo.data
            }
        }

    })
    console.log(advertisementsData)
    return (
        <div className='  mx-auto'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          // modules={[Autoplay, Pagination, Navigation]}
          // className='mySwiper'
        >
         {
            advertisementsData.filter(add=> add.status == 'aceecpt' )
            .map(add=>   <SwiperSlide key={add._id}>
                <div className=" relative">
              {/* Banner Section with Background Image */}
              <div className="relative w-full h-[600px] flex  justify-center items-center transition-all duration-1000 ease-in-out transform hover:scale-110"
                 style={{ backgroundImage: `url(${add.photo})`,backgroundSize: "cover",backgroundPosition: "center", }}   >
                     
                {/* Dark Overlay for better text visibility */}
                {/* <div className="absolute inset-0 bg-black opacity-20"></div> */}
                
                {/* Content Section */}
                <div className="relative z-10  text-center text-white py-32 px-6">
                  {/* Heading with bold text and cool effects */}
                  <h1 className="text-5xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#ee3c3c] animate__animated animate__fadeIn animate__delay-1s">
                   {add.medicineName}
                  </h1>
                  {/* Paragraph with a slight animation */}
                  <p className="text-xl sm:text-xl md:text-xl mb-8 max-w-3xl mx-auto text-gray-900 opacity-85 animate__animated animate__fadeIn animate__delay-2s">
                  {add.Description}
                  </p>
                
                  
                </div>
              </div>
            </div>
                </SwiperSlide>)
         
                
         }
          
         
        </Swiper>
      </div>
    );
};

export default Bannar;