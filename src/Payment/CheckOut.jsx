import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheackFrom from './CheackFrom';

const CheckOut = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r  p-6">
            <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-first mb-6">
                    Complete Your Payment
                </h2>
                <p className="text-center text- text-lg mb-6">
                    Safe and secure payment powered by Stripe.
                </p>
                <Elements stripe={stripePromise}>
                    <CheackFrom />
                </Elements>
            </div>
        </div>
    );
};

export default CheckOut;
