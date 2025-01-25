import React from 'react';

import HelmetSet from './HelmetSet';

const Error = () => {
    return (
        <div className='flex w-6/12 mx-auto justify-center items-center
         min-h-screen'>
            <HelmetSet sub1='MEdiStore' sub2='Error'></HelmetSet>
            <img className='w-full' src='/error-404.png' alt="" />

            
        </div>
    );
};

export default Error;