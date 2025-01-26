import React from 'react';
import Header from '../../CommonComponent/Header';

const ReveiwsClient = () => {
    return (
        <div >
            <Header title='Reviews' subTitle=' Hear from Our Happy Customers' details='At Medistore, we believe in the power of customer feedback. Our Reviews Section is where you can hear directly from those who have experienced our products and services. We value every review, as it helps us improve and ensure that we are providing the best health solutions'></Header>
            <ul className="md:timeline md:timeline-vertical">
    <li>
        <hr />
        <div className="timeline-middle py-2">
            <img className='w-[30px] mx-2 text-first' src="https://img.icons8.com/?size=60&id=123839&format=png&color=85A844" alt="" />
        </div>

        <div className="timeline-start timeline-box">
           
            <p className="text-sm text-gray-600 mt-2">Review by: farjana mou </p>
            <p className="text-xs text-gray-500">Date: Jan 15, 2025</p>
            <p className="text-second mt-1">"Medistore is a reliable store for buying healthcare products. I ordered a few vitamins and a home-use thermometer, and both were delivered in excellent condition."</p>
        </div>
        <hr />
    </li>

    <li>
        <hr />
        <div className="timeline-middle py-2">
            <img className='w-[30px] mx-2 text-first' src="https://img.icons8.com/?size=60&id=123839&format=png&color=85A844" alt="" />
        </div>
        <div className="timeline-end timeline-box">
           
            <p className="text-sm text-gray-600 mt-2">Review by: Sarah Smith</p>
            <p className="text-xs text-gray-500">Date: Oct 20, 2024</p>
            <p className="text-second mt-1">"Medistore has been my go-to place for health-related products. The products are of high quality, and the discounts are fantastic"</p>
        </div>
        <hr />
    </li>

    <li>
        <hr />
        <div className="timeline-middle py-2">
            <img className='w-[30px] mx-2 text-first' src="https://img.icons8.com/?size=60&id=123839&format=png&color=85A844" alt="" />
        </div>

        <div className="timeline-start timeline-box">
          
            <p className="text-sm text-gray-600 mt-2">Review by: Ahmed Chowdhury</p>
            <p className="text-xs text-gray-500">Date: Mar 5, 2023</p>
            <p className="text-second mt-1">"I recently purchased some skincare products from Medistore, and I'm really happy with the quality. The prices are reasonable, and they offer great discounts. It was also very convenient to track my order."</p>
        </div>
        <hr />
    </li>

    <li>
        <hr />
        <div className="timeline-middle py-2">
            <img className='w-[30px] mx-2' src="https://img.icons8.com/?size=60&id=123839&format=png&color=85A844" alt="" />
        </div>

        <div className="timeline-end timeline-box">
           
            <p className="text-sm text-gray-600 mt-2">Review by: Maria Rahman</p>
            <p className="text-xs text-gray-500">Date: Dec 10, 2024</p>
            <p className="text-second mt-1">"The best online store for health essentials! I’ve been using Medistore for a few months now, and I’m always satisfied with my purchases."</p>
        </div>
        <hr />
    </li>
</ul>

            
        </div>
    );
};

export default ReveiwsClient;