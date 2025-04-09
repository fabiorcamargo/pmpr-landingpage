"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/style";
import CryptoJS from "crypto-js";

const getClientId = (): string | null => {
  const gaCookie = document.cookie.split("; ").find((row) => row.startsWith("_ga="));
  if (!gaCookie) return null;
  const parts = gaCookie.split(".");
  return parts.length >= 4 ? `${parts[2]}.${parts[3]}` : null;
};

const isEmailValido = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const formatTelefone = (value: string) => {
  let cleaned = value.replace(/\D/g, "");

  if (cleaned.startsWith("55") && cleaned.length > 11) {
    cleaned = cleaned.substring(2);
  }

  if (cleaned.length === 0) return "";
  if (cleaned.length <= 2) return `(${cleaned}`;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  if (cleaned.length <= 10)
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

const FormGratis: React.FC = () => {
  const [form, setForm] = useState({ nome: "", telefone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [dadosRetorno, setDadosRetorno] = useState<{
    login: string;
    senha: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    const enviado = localStorage.getItem("formularioEnviado");
    if (enviado === "true") setFormularioEnviado(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "telefone") {
      const telefoneFormatado = formatTelefone(value);
      setForm((prevForm) => ({ ...prevForm, telefone: telefoneFormatado }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const clientId = getClientId();
    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");

    if (!isEmailValido(form.email)) {
      alert("❌ E-mail inválido");
      setLoading(false);
      return;
    }

    let telefoneLimpo = form.telefone.replace(/\D/g, "");
    if (telefoneLimpo.startsWith("55") && telefoneLimpo.length > 11) {
      telefoneLimpo = telefoneLimpo.substring(2);
    }

    if (telefoneLimpo.length !== 11) {
      alert("❌ Telefone inválido. Digite o número completo com DDD.");
      setLoading(false);
      return;
    }

    const emailHash = CryptoJS.SHA256(form.email.trim().toLowerCase()).toString(CryptoJS.enc.Hex);
    const telefoneHash = CryptoJS.SHA256(telefoneLimpo).toString(CryptoJS.enc.Hex);

    try {
      const res = await fetch("https://auto.profissionalizaead.com.br/webhook-test/91fdeab0-d7e4-46ea-93ad-1ae11377225e", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, telefone: telefoneLimpo, client_id: clientId }),
      });

      if (res.ok) {
        const data = await res.json();
        setDadosRetorno({ login: data.login, senha: data.senha, url: data.url });

        alert("✅ Enviado com sucesso!");
        localStorage.setItem("formularioEnviado", "true");
        setFormularioEnviado(true);

        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "generate_lead", {
            cadastro_tipo: "Gratuito",
            status: "sucesso",
          });
        }

        if (typeof window !== "undefined" && typeof window.fbq === "function") {
          window.fbq("track", "Lead", {
            content_name: "Cadastro Gratuito",
            status: "sucesso",
            em: emailHash,
            ph: telefoneHash,
            fbp: fbp || undefined,
            fbc: fbc || undefined,
          });
        }
      } else {
        alert("❌ Ocorreu um erro ao enviar.");
      }
    } catch (error) {
      alert("❌ Erro na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex justify-center lg:px-4">
      <div className="bg-gray-900 lg:p-8 p-4 rounded-lg w-full max-w-2xl text-center">
        <h2 className="font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
          Libere o acesso gratuito.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] w-full max-w-xl mx-auto pt-4`}>
          "Preencha os dados abaixo que iremos liberar um conteúdo gratuito para você conhecer a melhor plataforma de estudos do mercado"
        </p>

        {formularioEnviado ? (
          <div className="flex flex-col items-center mt-6">
            <p className="text-green-600 font-semibold text-lg text-center">
              ✅ Cadastro Gratuito já liberado, confira seu e-mail e Whatsapp.
            </p>

            {dadosRetorno && (
              <div className="mt-6 bg-green-100 text-green-800 p-4 rounded-lg text-left w-full max-w-xl">
                <p><strong>🎉 Acesso liberado!</strong></p>
                <p><strong>Login:</strong> {dadosRetorno.login}</p>
                <p><strong>Senha:</strong> {dadosRetorno.senha}</p>
                <p><strong>Link de Acesso:</strong>{" "}
                  <a className="text-blue-600 underline" href={dadosRetorno.url} target="_blank" rel="noopener noreferrer">
                    {dadosRetorno.url}
                  </a>
                </p>
              </div>
            )}

            <button
              className="mt-6 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
              onClick={() => {
                localStorage.removeItem("formularioEnviado");
                setFormularioEnviado(false);
                setForm({ nome: "", telefone: "", email: "" });
                setDadosRetorno(null);
              }}
            >
              🔁 Deseja cadastrar novamente?
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6 w-full max-w-xl mx-auto">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 w-full"
              required
            />
            <input
              type="tel"
              name="telefone"
              placeholder="(DDD) 9XXXX-XXXX"
              value={form.telefone}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 w-full"
              maxLength={20}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 w-full"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Quero Participar"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default FormGratis;
