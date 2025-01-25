import React from 'react';
import useAxiosPublic from '../../CustomHook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineShop } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from 'react-icons/md';


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
     console.log(categoryData)
    return (
        <div className='mb-16 text-second'>
        <h2 className='text-lg px-4 items-center font-semibold gap-2 flex py-4 text-first'> <AiOutlineShop size={26} ></AiOutlineShop> <span>Medicines By Category </span></h2>

        {categoryData.map(category=> <div className='p-2' key={category._id}>
           <NavLink to={`/category/${category.MedicineCategory}`}  >
               <div  className='flex   border-b-2 gap-4 items-center justify-between pb-5'>
               <div className='flex items-center gap-4'> <img className='w-12 h-12 object-cover' src={category.categoryPhoto} alt="" />
               <h2 className='capitalize text-md  font-semibold'>{category.MedicineCategory}</h2></div>
                 
               </div>
         
            </NavLink>
        </div>)}

    
        </div>
    );
};

export default Category;