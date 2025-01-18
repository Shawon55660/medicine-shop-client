import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../CustomHook/useAxiosPrivate';
import useAuth from '../CustomHook/useAuth';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheackFrom = () => {

    const axiosPrivate = useAxiosPrivate()
    const {user,paymentInfo,setPaymentInfo} = useAuth()
    const stripe = useStripe()
    const navigate = useNavigate()
    const elements = useElements()
    const [clientSecret, setClientSecret] = useState('')
    const { data: cartData = [], isLoading: medicinesLoading, refetch } = useQuery({
        queryKey: ['cartData', user.email],
        queryFn: async () => {
            const catInfo = await axiosPrivate.get(`/cartsOwner?userEmail=${user?.email}`)
            if (catInfo.data) {
                return catInfo.data
            }
        }

    })
    const totalPrice = cartData.reduce((total,item )=> total+item.Price,0)
    useEffect(()=>{
      if(totalPrice >0){
       
        axiosPrivate.post('/create-payment-intent',{price:totalPrice,cartData})
        .then(res=>{
          console.log(res.data)
          setClientSecret(res.data.clientSecret)
          setPaymentInfo(res.data)
        })
      }
    },[axiosPrivate,totalPrice])

    const handleSubmit = async(e)=>{
      e.preventDefault()
      if(!stripe || !elements) return
      const cardElement = elements.getElement(CardElement);
      const {error,paymentMethod} = await stripe.createPaymentMethod({
        type:'card',
        card:cardElement
      })
      if(error) return

      //confrim payment
      const {paymentIntent,error:confirmError} = await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
          card:cardElement,
          billing_details:{
            email:user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
          }
        }
      })
      if(confirmError){
        alert('error is here')
       
      }
      else{
     
        if(paymentIntent.status === 'succeeded'){
          // payment api post all data in new collccdtion in server
          
         
          // console.log(paymentIntent)
        //  const paymentCart= cartData.map(item=>({
        //     ...item,
        //     date: new Date(),
        //     BuyerEmail:user?.email,
        //     transactionId:paymentIntent.id,
        //     status: 'pending',
        //   }))
        //   console.log(paymentCart)
          const payment = {
            
            buyerEmail: user.email,
            sellerEmail:cartData.map(item=> item.sellerEmail),
            totalPrice:totalPrice,
            transactionId:paymentIntent.id,
            medicineId:cartData.map(item=>item.medicineId),
            cartId:cartData.map(item=> item._id),
            Price:cartData.map(item=> item.Price),
            status: 'pending',
            data:new Date()
        }
        const res =await axiosPrivate.post('/payment',payment)
        if(res){
            refetch()
            console.log(res)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thank you for the taka paisa",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/invoice')
        }

        }
      }


    }
    
    return (
        <div className='max-w-md mx-auto flex my-12 justify-center bg-yellow-400 items-center min-h-[40vh]'>
             <form onSubmit={handleSubmit}>
      
      <div>
        <label>Amount: {totalPrice}</label>
        {/* <input type="text" name="" id="" /> */}
        
      </div>
      <div className="" style={{ width: '400px' }}> {/* Adjust width here */}
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
      <button type="submit"className='btn' disabled={!stripe}>Pay</button>
    </form>
            
        </div>
    );
};

export default CheackFrom;