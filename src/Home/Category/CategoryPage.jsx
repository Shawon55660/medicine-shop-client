import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../CustomHook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const CategoryPage = () => {

    const {category} = useParams()
    const axiosPublic = useAxiosPublic()
    const { data: medicinesData = [], refetch:medicinesFetch, isLoading:medicinesLoading } = useQuery({
        queryKey: ['medicinesData', 'medicines'],
        queryFn: async () => {
            const catInfo = await axiosPublic.get(`/category-medicines?category=${category}`)
            if (catInfo.data) {
                return catInfo.data
            }
        }

    })

    return (
        <div className=''>
           <h2></h2>
           
            {
                medicinesData.map(categoryData=> <h2>{categoryData.category}</h2>)
            }

        </div>
    );
};

export default CategoryPage;