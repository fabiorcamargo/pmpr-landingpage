'use client';
import { useEffect } from 'react';
import CheckoutForm from '@/components/CheckoutForm';

const Home: React.FC = () => {
  useEffect(() => {
    window.gtag?.('config', 'AW-17024321136');
  }, []);

  return (
    <>
      {/* Head específico para esta página */}
      <head>
        <meta name="theme-color" content="#fff" />
        <title>Pagamento Seguro - PMPR</title>
        <meta name="description" content="Finalize sua compra com segurança para o Concurso PMPR 2025." />
      </head>

      {/* Navbar */}
      <div className='min-h-screen bg-white'>
        <nav className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-md flex items-center justify-center sticky top-0 z-10">
          <img src="/assets/logo_mp.svg" alt="Mercado Pago Logo" className="h-12" />
          <span className="text-indigo-900 font-bold">Compra Segura</span>
        </nav>
        <div className="bg-white w-full overflow-hidden flex justify-center p-4">
          <CheckoutForm />
        </div>
      </div>
    </>
  );
};

export default Home;
