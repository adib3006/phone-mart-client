import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const order = useLoaderData();
    return (
        <div>
            <h1 className='text-5xl'>Payment for {order?.phoneName}</h1>
            <h4 className='text-3xl'>Please pay <span className='font-semibold'>${order?.price}</span> to confirm your order.</h4>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        order={order}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;