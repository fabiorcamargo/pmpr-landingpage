import { useEffect, useState } from "react";
import { PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import type { PaymentRequest } from "@stripe/stripe-js";  // Importando o tipo correto

interface CheckoutPageProps {
  amount: number;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutPage({ amount }: CheckoutPageProps) {
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [isPaymentRequestAvailable, setIsPaymentRequestAvailable] = useState(false);

  useEffect(() => {
    const initializePaymentRequest = async () => {
      const stripe = await stripePromise;
      if (!stripe) {
        return;
      }

      const pr = stripe.paymentRequest({
        country: "BR", // País Brasil
        currency: "brl", // Moeda brasileira
        total: {
          label: "Total",
          amount: amount * 100, // O valor precisa estar em centavos
        },
      });

      pr.canMakePayment().then((result) => {
        if (result?.applePay || result?.googlePay) {
          setPaymentRequest(pr);
          setIsPaymentRequestAvailable(true);
        }
      });
    };

    initializePaymentRequest();
  }, [amount]);

  return (
    <div>
      {isPaymentRequestAvailable && paymentRequest ? (
        <PaymentRequestButtonElement
          options={{
            paymentRequest,
            style: {
              paymentRequestButton: {
                type: "buy",
                theme: "dark",
                height: "40px",
              },
            },
          }}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}