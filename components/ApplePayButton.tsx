'use client'

import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

const ApplePayButton = () => {
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    const initStripe = async () => {
      const stripe = await stripePromise
      if (!stripe) return

      const paymentRequest = stripe.paymentRequest({
        country: 'BR',
        currency: 'brl',
        total: {
          label: 'Total',
          amount: 1990, // R$19,90
        },
        requestPayerName: true,
        requestPayerEmail: true,
      })

      const result = await paymentRequest.canMakePayment()
      if (result) {
        const elements = stripe.elements()
        const prButton = elements.create('paymentRequestButton', {
          paymentRequest,
        })

        prButton.mount('#payment-request-button')
        setAvailable(true)
      }
    }

    initStripe()
  }, [])

  return (
    <div>
      {available ? (
        <div id="payment-request-button" className="my-4" />
      ) : (
        <p className="text-white">Apple Pay não está disponível no dispositivo.</p>
      )}
    </div>
  )
}

export default ApplePayButton
