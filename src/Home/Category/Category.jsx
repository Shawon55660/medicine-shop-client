import React from 'react';
import useAxiosPublic from '../../CustomHook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Category = () => {
    const axiosPublic = useAxiosPublic()
        const { data: categoryData = [], refetch, isLoading } = useQuery({
        queryKey: ['categoryData', 'category'],
        queryFn: async () => {
          const catInfo = await axiosPublic.get('/category')
          if (catInfo.data) {
            return catInfo.data
          }
        }
    
      })
      const handleCategory =(category)=>{
        console.log(category)
      }
    return (
        <div>
       <div className='grid grid-cols-4 gap-2'>

        {categoryData.map(category=> <div key={category._id}>
           <Link to={`/category/${category.MedicineCategory}`}  onClick={()=>handleCategory(category.MedicineCategory)}>
           <h2 className='p-12 flex justify-center items-center border-2 my-2 border-red-500'>
                {category.MedicineCategory}
            </h2></Link>
        </div>)}

       </div>
            
        </div>
    );
};

export default Category;