"use client"
import styles from "@/styles/style";
import { Navbar, Hero, Stats, Business, Billing, CardDeal, Testimonials, Clients, CTA, Cartao, Footer } from "@/components"
import AnalyticsDebugger from "@components/AnalyticsDebugger";
import SendClientIdToN8n from "@components/SendClientIdToN8n";
import CheckoutForm, { OrderItem } from '@/components/CheckoutForm';
const Home: React.FC = () => {
  const items: OrderItem[] = [
    {
      id: 1,
      name: 'Preparatório PMPR 2025',
      price: 197,
      quantity: 1,
      image: '/assets/imgpmpr.webp',
    },
  ];
  const shippingCost = 0; // Se for curso online, geralmente é zero.
  const taxRate = 0.05; // Exemplo: 5% de taxa
  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-100 dark:bg-gray-800 py-4 shadow-md text-center text-sm sm:text-base">
        <span className="dark:text-white text-gray-700 font-bold">🔒 Compra 100% Segura</span>
      </nav>
      <div className="bg-gray-200 dark:bg-black w-full overflow-hidden flex justify-center">
        <div className="max-w-3xl w-full pb-8 sm:px-4 sm:px-6 lg:px-8">

          <CheckoutForm />

          {/* <AnalyticsDebugger/> */}
          {/* <SendClientIdToN8n/> */}
        </div>
      </div>
    </>
  )
}

export default Home