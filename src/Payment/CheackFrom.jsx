import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../CustomHook/useAxiosPrivate';
import useAuth from '../CustomHook/useAuth';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Loading from '../CommonComponent/Loading';

const CheackFrom = () => {
    const axiosPrivate = useAxiosPrivate();
    const { user, paymentInfo, setPaymentInfo } = useAuth();
    const stripe = useStripe();
    const navigate = useNavigate();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [isLoadingPayment, setIsLoadingPayment] = useState(false); // Add loading state for payment

    const { data: cartData = [], isLoading: medicinesLoading, refetch } = useQuery({
        queryKey: ['cartData', user.email],
        queryFn: async () => {
            const catInfo = await axiosPrivate.get(`/cartsOwner?userEmail=${user?.email}`);
            if (catInfo.data) {
                return catInfo.data;
            }
        }
    });

    const totalPrice = cartData.reduce((total, item) => total + item.Price, 0);

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
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        });
        if (error) {
            setIsLoadingPayment(false); 
            return;
        }

        // Confirm payment
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
            setIsLoadingPayment(false); 
            alert('Payment error');
        } else {
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
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the taka paisa",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/invoice');
                }
            }
        }

        setIsLoadingPayment(false); 
    };

    return (
        <div className='max-w-md mx-auto flex my-12 justify-center bg-yellow-400 items-center min-h-[40vh]'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount: {totalPrice}</label>
                </div>

                {medicinesLoading ? (
                    <Loading></Loading>
                ) : (
                    <div className="" style={{ width: '400px' }}> 
                        <CardElement 
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#FFFFFF',
                                        '::placeholder': {
                                            color: '#FFFFFF',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>
                )}

                <button type="submit" className='btn' disabled={!stripe || isLoadingPayment}>
                    {isLoadingPayment ? (
                       <Loading></Loading>
                    ) : (
                        'Pay'
                    )}
                </button>
            </form>
        </div>
    );
};

export default CheackFrom;
