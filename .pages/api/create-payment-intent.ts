// pages/api/create-payment-intent.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-03-31.basil"
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("🔔 Requisição recebida!", req.body);
  if (req.method !== "POST") {
    return res.status(405).end("Method not allowed");
  }

  const { amount, payment_method } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "brl",
      payment_method,
      confirmation_method: "manual",
      confirm: false, // será confirmado no client
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
