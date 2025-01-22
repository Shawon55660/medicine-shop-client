import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../CustomHook/useAxiosPrivate';
import useAuth from '../CustomHook/useAuth';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../CommonComponent/Loading';
import HelmetSet from '../CommonComponent/HelmetSet';

const CheackFrom = () => {
    const axiosPrivate = useAxiosPrivate();
    const { user, paymentInfo, setPaymentInfo } = useAuth();
    const stripe = useStripe();
    const navigate = useNavigate();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);

    const { data: cartData = [], isLoading: medicinesLoading, refetch } = useQuery({
        queryKey: ['cartData', user.email],
        queryFn: async () => {
            const catInfo = await axiosPrivate.get(`/cartsOwner?userEmail=${user?.email}`);
            if (catInfo.data) {
                return catInfo.data;
            }
        }
    });

    const totalPrice = cartData.reduce((total, item) => total + (Math.floor(item.Price - ((item.Price * item.DisPrice) / 100))), 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosPrivate.post('/create-payment-intent', { price: totalPrice, cartData })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                    setPaymentInfo(res.data);
                });
        }
    }, [axiosPrivate, totalPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoadingPayment(true);
        const cardElement = elements.getElement(CardElement);

      
        const paymentPromise = new Promise(async (resolve, reject) => {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement
            });

            if (error) {
                reject(error.message);
                return;
            }

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            });

            if (confirmError) {
                reject(confirmError.message);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                const paymentCart = cartData.map(item => ({
                    ...item,
                    date: new Date(),
                    BuyerEmail: user?.email,
                    transactionId: paymentIntent.id,
                    status: 'pending',
                }));

                const res = await axiosPrivate.post('/payment', paymentCart);

                if (res) {
                    refetch();
                    resolve(
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Your Order has been confrim",
                        showConfirmButton: false,
                        timer: 2000
                    }))
                    navigate('/invoice');
                }
            }
        });

        toast.promise(paymentPromise, {
            pending: 'Processing payment...',
            error: 'Payment failed. Please try again.',
        });

        setIsLoadingPayment(false);
    };

    return (
        <div  className="flex justify-center items-center  bg-gray-100">

          <HelmetSet sub1='MediStore' sub2='Payment'></HelmetSet>
            <div className="w-full max-w-lg mx-auto">
            <ToastContainer />
            <form 
  onSubmit={handleSubmit} 
  className="bg-white shadow-md rounded-lg p-8 space-y-4 w-full max-w-lg"
>
  <div>
    <label className="block text-second text-xl font-bold mb-2">
    Total  Amount: <span className="text-first font-semibold">{totalPrice} tk</span>
    </label>
  </div>

  <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
    <CardElement
      options={{
        style: {
          base: {
            fontSize: '16px',
            color: '#333',
            '::placeholder': {
              color: '#888',
            },
          },
          invalid: {
            color: '#e63946',
          },
        },
      }}
    />
  </div>

  <button 
    type="submit" 
    className={`w-full bg-first text-white font-bold py-2 px-4 rounded-md hover:bg-[#637c34] transition-all ${
      isLoadingPayment ? 'opacity-50 cursor-not-allowed' : ''
    }`} 
    disabled={!stripe || isLoadingPayment}
  >
    {isLoadingPayment ? <Loading /> : 'Pay Now'}
  </button>
</form></div>

        </div>
    );
};

export default CheackFrom;
