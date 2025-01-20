import React from 'react';

const Header = ({title,subTitle,details}) => {
    return (
        <div className='flex text-center flex-col justify-center my-16'>
            <h4 className='text-first font-mono italic text-md font-semibold'>{title}</h4>
            <h1  className='text-3xl py-2  text-second font-bold font-sans'>{subTitle}</h1>
            <p className='text-thrid w-7/12 leading-7 italic py-4 mx-auto text-sm'>{details}</p>
            
        </div>
    );
};

export default Header;