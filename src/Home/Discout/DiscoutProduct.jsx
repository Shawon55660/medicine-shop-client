import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination } from 'swiper/modules';
import useAxiosPublic from '../../CustomHook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Header from '../../CommonComponent/Header';

const DiscountProduct = () => {
    const axiosPublic  = useAxiosPublic()
    const { data: discountData = [], refetch:discountFetch, isLoading:discountLoding } = useQuery({
        queryKey: ['discountData', 'advertisements'],
        queryFn: async () => {
            const catInfo = await axiosPublic.get('/discountMedicine')
            if (catInfo.data) {
                return catInfo.data
            }
        }

    })
  return (
   <div>
    <Header title='Discount' subTitle='What Our Clients Say' details='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus lobortis faucibus. Pellentesque vehicula lacinia arcu nec sodales.'></Header>
     <div className="max-w-xl mx-auto my-4">
       <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
            delay: 1000, 
            disableOnInteraction: false, 
          }}
        modules={[Pagination,Autoplay]}
        className="mySwiper"
      >

        {
            discountData.filter(discount=> discount.discountPercentage > 0)
            .map(discout=><SwiperSlide key={discout._id}>
                <div
              className="relative max-w-xl mx-auto rounded-lg shadow-lg overflow-hidden"
              style={{
                backgroundImage: `url(${discout.photo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
              {/* Content */}
              <div className="relative text-white text-center p-6">
                <h2 className="text-4xl font-bold text-first mb-2">{discout.discountPercentage }% OFF</h2>
                <p className='font-semibold'>{discout.GenericName}</p>
                <p className="text-xl mt-2 mb-4">Limited Time Offer</p>
                <Link to='/shop' className="bg-first text-white font-bold py-2 my-4 px-4 rounded-lg transition duration-300">
                  Shop Now
                </Link>
              </div>
            </div>
                </SwiperSlide>)
        }
        
        
      </Swiper>
    </>
    </div>
   </div>
  );
};

export default DiscountProduct;
