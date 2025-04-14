'use client'

import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from './CheckoutPage';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const ApplePayButton = () => {
  const [available, setAvailable] = useState(false)

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutPage amount={49.99} />
      </Elements>
    </div>

  )
}

export default ApplePayButton
