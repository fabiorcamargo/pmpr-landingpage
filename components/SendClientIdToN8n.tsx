"use client";

import { useEffect } from "react";

const GA_TRACKING_ID = "G-3FJHE8L3C1";
const N8N_WEBHOOK_URL = "https://auto.profissionalizaead.com.br/webhook-test/91fdeab0-d7e4-46ea-93ad-1ae11377225e"; // <-- Substitua aqui

const SendClientIdToN8n = () => {
  useEffect(() => {
    const gtag = (window as any).gtag;

    // Função auxiliar para pegar o IP público
    const getIp = async (): Promise<string | null> => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        return data.ip;
      } catch (err) {
        console.error("Erro ao obter o IP:", err);
        return null;
      }
    };

    const sendData = async () => {
      if (!gtag) {
        console.warn("gtag não está disponível.");
        return;
      }

      gtag("get", GA_TRACKING_ID, "client_id", async (clientId: string) => {
        const ip = await getIp();

        const payload = {
          client_id: clientId,
          ip: ip,
          user_agent: navigator.userAgent,
          page_path: window.location.pathname,
        };

        console.log("Enviando dados para o n8n:", payload);

        try {
          await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          console.log("Dados enviados com sucesso ✅");
        } catch (error) {
          console.error("Erro ao enviar dados para o n8n ❌", error);
        }
      });
    };

    sendData();
  }, []);

  return null;
};

export default SendClientIdToN8n;
