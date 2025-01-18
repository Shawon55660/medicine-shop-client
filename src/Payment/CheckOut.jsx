import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheackFrom from './CheackFrom';

const CheckOut = () => {
    const stripePromise  = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
    return (
        <div>
           <h2 className='text-2xl text-center'> Payment Here</h2>
           <Elements stripe={stripePromise}>
            <CheackFrom></CheackFrom>
           </Elements>
            
        </div>
    );
};

export default CheckOut;