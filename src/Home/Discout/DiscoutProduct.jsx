import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination } from 'swiper/modules';
import useAxiosPublic from '../../CustomHook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Header from '../../CommonComponent/Header';
import Loading from '../../CommonComponent/Loading';

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
       if (discountLoding) return <Loading></Loading>
  return (
   <div>
    <Header title='Discount' subTitle='Discounted Prices for a Healthier You' details='At Medistore, we bring exciting discounts on essential health products to make your purchases more affordable. Our discount section includes a wide range of medical supplies and health-related products.'></Header>
     <div className="max-w-xl mx-auto my-4">
       <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        centeredSlides={true}
        loop={true}
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
              className="relative max-w-xl bg-no-repeat flex my-8 items-center object-cover justify-center  flex-col mx-auto rounded-lg shadow-lg overflow-hidden"
              style={{
                backgroundImage: `url(${discout.photo})`,
                
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
              {/* Content */}
              <div className="relative text-white text-center p-6">
                <h2 className="text-2xl md:text-5xl font-bold text-white my-4">{discout.discountPercentage }% OFF</h2>
                <p className='font-semibold text-lg md:text-xl'>{discout.ItemName}</p>
                <p className="text-2xl md:text-4xl font-semibold mt-4 mb-8">Limited Time Offer</p>
                <Link to='/shop' className="bg-first text-white font-bold py-2 my-4 px-4 rounded-sm transition duration-300">
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
