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
        <div className='  max-w-[1348px] mx-auto'>
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
                <div className=" w-full rounded-2xl h-[300px]  mt-4   relative">
             <img className='w-full object-cover h-full bg-cover rounded-2xl' src={add.photo} alt="" />
                
               
            
            </div>
                </SwiperSlide>)
         
                
         }
          
         
        </Swiper>
      </div>
    );
};

export default Bannar;