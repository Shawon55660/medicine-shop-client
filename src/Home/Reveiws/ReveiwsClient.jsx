import React from 'react';
import Header from '../../CommonComponent/Header';

const ReveiwsClient = () => {
    return (
        <div >
            <Header title='Reviews' subTitle=' Our  Top Reveiws' details='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus lobortis faucibus. Pellentesque vehicula lacinia arcu nec sodales.'></Header>
              <ul className="md:timeline md:timeline-vertical">
                        <li>
                            <hr />
                            <div className="timeline-middle py-2">
                                <img className='w-[30px] mx-2 text-first' src="https://img.icons8.com/?size=60&id=123839&format=png&color=85A844" alt="" />
                            </div>

                            <div className="timeline-start timeline-box">

                                <p className='text-xs italic font-semibold mb-2 text-first'>Sep ,2020 - present</p>
                                <p className='text-md font-semibold text-second pb-1'>skill development institution,bangladesh</p>
                                <p className='text-second'>Bangladesh Skill Development Institute (BSDI) is a leading organization in the field of education and training, establis</p>
                            </div>
                            <hr />

                        </li>
                        <li>
                            <hr />
                            <div className="timeline-middle py-2">
                                <img className='w-[30px] mx-2 text-first' src="https://img.icons8.com/?size=60&id=123839&format=png&color=85A844" alt="" />
                            </div>
                            <div className="timeline-end timeline-box">


                                <p className='text-xs italic font-semibold mb-2 text-first'>Sep ,2019 - 2020


</p>
                                <p className='text-md font-semibold text-second pb-1'>Computer Space Institute, Kushtia</p>
                                <p className='text-second'>Graphic design is a craft where professionals create visual content to communicate messages. By applying visual hiera.</p>
                            </div>
                           
                            <hr />


                        </li>


                        <li>
                            <hr />
                            <div className="timeline-middle py-2">
                                <img className='w-[30px] mx-2 text-first' src="https://img.icons8.com/?size=60&id=123839&format=png&color=85A844" alt="" />
                            </div>

                            <div className="timeline-start timeline-box">

                                <p className='text-xs italic font-semibold mb-2 text-first'>Sep ,2018 - 2019


</p>
                              
                                <p className='text-md font-semibold text-second  pb-1'>Computer Space Institute, Kushtia</p>
                                <p className='text-second'> Computer skills at work refer to the knowledge and ability to us  Lorem ipsum dolor sit.</p>
                            </div>
                            <hr />

                        </li>
                        <li>
                            <hr />
                            <div className="timeline-middle py-2 ">
                                <img className='w-[30px] mx-2 ' src="https://img.icons8.com/?size=60&id=123839&format=png&color=85A844" alt="" />
                            </div>

                            <div className="timeline-end timeline-box">

                                <p className='text-xs italic font-semibold mb-2 text-first'>Aug ,2019- 2024

</p>
                              
                                <p className='text-md font-semibold text-second pb-1'>
                                KPI ,bangladesh</p>
                                <p className='text-second'>kushtia polytechnic institution ,CSE student session 2019-2020.Compelete Deploma with GCPA 3.76.</p>
                            </div>
                            <hr />

                        </li>
                    </ul>
            
        </div>
    );
};

export default ReveiwsClient;