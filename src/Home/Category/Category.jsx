import React from 'react';
import useAxiosPublic from '../../CustomHook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineShop } from "react-icons/ai";
import Loading from '../../CommonComponent/Loading';



const Category = () => {
    const axiosPublic = useAxiosPublic()
        const { data: categoryData = [], refetch, isLoading } = useQuery({
        queryKey: ['categoryData', 'categoryAll'],
        queryFn: async () => {
          const catInfo = await axiosPublic.get('/categoryAll')
          if (catInfo.data) {
            return catInfo.data
          }
        }
    
      })
       if (isLoading) return <div className='w-72'></div>

    
    return (
        <div className='mb-24 text-second   w-72'>
       <div className='relative   bg-white  '> 
          
       </div>
       <h2 className='text-xl  py-4 px-2 sticky top-0 items-center bg-white dark:bg-gray-800 justify-start font-semibold gap-2 flex   text-first'> <AiOutlineShop size={30} ></AiOutlineShop> <span> By Category </span></h2>

        {categoryData.map(category=> <div className='p-2' key={category._id}>
           <NavLink to={`/category/${category.MedicineCategory}`}  >
               <div  className='flex   border-b-2 gap-4 dark:border-gray-500 items-center dark:text-white justify-between pb-5'>
               <div className='flex items-center gap-4'> <img className='w-12 h-12 object-cover' src={category.categoryPhoto} alt="" />
               <h2 className='capitalize text-md  font-semibold'>{category.MedicineCategory}</h2></div>
                 
               </div>
         
            </NavLink> 
        </div>)}

    
        </div>
    );
};

export default Category;