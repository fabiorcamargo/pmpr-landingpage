"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";


const initpw = process.env.NEXT_PUBLIC_INIT_PW as string;
const n8nroute = process.env.NEXT_PUBLIC_N8N_CLIENT_STATUS as string;

const Home: React.FC = () => {
  const [cliente, setCliente] = useState<any>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [externalReference, setExternalReference] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    
    setIsClient(true);
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    const externalReference = params.get("external_reference");

    setStatus(status);
    setExternalReference(externalReference);

    const fetchCliente = () => {
      if (externalReference) {
        fetch(`${n8nroute}?external_reference=${externalReference}`)
          .then((res) => res.json())
          .then((data) => {
            setCliente(data);
            if (data.status && data.status !== status) {
              setStatus(data.status);
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar dados do cliente:", error);
          });
      }
    };

    fetchCliente();

    let interval: NodeJS.Timeout;

    if (status === "pending" && externalReference) {
      interval = setInterval(fetchCliente, 5000);
    }

    return () => clearInterval(interval);
  }, []);

  // Disparar evento do Google Ads quando aprovado
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag('event', 'ads_conversion_P_gina_de_sucesso_1');
    }
  }, [status]);

  const renderStatusMessage = () => {
    if (!status) return null;

    switch (status) {
      case "approved":
        return (
          <div className="bg-slate-100 border-2 border-green-400 text-green-800 px-6 py-4 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">Pagamento Aprovado ✅</h2>
            <p>Seu pedido foi processado com sucesso!</p>
            <p className="text-sm text-gray-700 mt-2">Referência: <strong>{externalReference}</strong></p>
            {cliente ? (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Dados do Cliente</h3>
                <p><strong>Nome:</strong> {cliente.nome}</p>
                <p><strong>Login:</strong> {cliente.email}</p>
                <p><strong>Senha:</strong> {initpw}</p>
                <p className="pt-4">Os dados também foram enviados no seu email e Whatsapp, mas por questões de segurança salve os dados de acesso.</p>
                <a
                  href={`https://profissionaliza.cademi.com.br/auth/login?email=${cliente.email}`}
                  className="mt-4 block w-full rounded-md bg-sky-600 px-3 py-3 text-center text-md font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Acessar Agora
                </a>
              </div>
            ) : (
              <p>Carregando dados do cliente...</p>
            )}
          </div>
        );

      case "pending":
        return (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">Pagamento Pendente ⏳</h2>
            <p>Estamos aguardando a confirmação do seu pagamento.</p>
            <p className="text-sm text-gray-700 mt-2">Referência: <strong>{externalReference}</strong></p>
          </div>
        );

      case "rejected":
      case "failure":
        return (
          <div className="bg-red-100 border border-red-400 text-red-800 px-6 py-4 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">Pagamento Recusado ❌</h2>
            <p>Houve um problema com o seu pagamento. Tente novamente.</p>
            <p className="text-sm text-gray-700 mt-2">Referência: <strong>{externalReference}</strong></p>
          </div>
        );

      default:
        return (
          <div className="bg-gray-100 border border-gray-400 text-gray-800 px-6 py-4 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">Status Desconhecido 🤔</h2>
            <p>Não conseguimos identificar o status do seu pagamento.</p>
            <p className="text-sm text-gray-700 mt-2">Referência: <strong>{externalReference}</strong></p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-md flex items-center justify-center sticky top-0 z-10 p-4">
        <img src="/assets/logo_mp.svg" alt="Mercado Pago Logo" className="h-12 mr-4" />
        <span className="text-indigo-900 font-bold text-xl">Compra Segura</span>
      </nav>

      <div className="flex justify-center items-center p-4">
        {isClient && renderStatusMessage()}
      </div>
    </div>
  );
};

export default Home;
