"use client";

import { useEffect, useState } from "react";
import styles, { layout } from "@/styles/style";

const getClientId = (): string | null => {
  const gaCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("_ga="));

  if (!gaCookie) return null;

  const parts = gaCookie.split(".");
  if (parts.length >= 4) {
    return `${parts[2]}.${parts[3]}`;
  }

  return null;
};

const FormGratis: React.FC = () => {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  // Verifica se já enviou
  useEffect(() => {
    const enviado = localStorage.getItem("formularioEnviado");
    if (enviado === "true") {
      setFormularioEnviado(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const clientId = getClientId();

    try {
      const res = await fetch("https://autowebhook.profissionalizaead.com.br/webhook/91fdeab0-d7e4-46ea-93ad-1ae11377225e", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, client_id: clientId }),
      });

      if (res.ok) {
        alert("✅ Enviado com sucesso!");
        localStorage.setItem("formularioEnviado", "true");
        setFormularioEnviado(true);
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
    <section className={`${layout.section}`}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>Acompanhe um exercício.</h2>
        <p className={`${styles.paragraph} max-w-[470px]`}>
          📢 "As questões são no modelo de banca e baseada nos concursos."
        </p>

        {formularioEnviado ? (
          <p className="text-green-600 font-semibold mt-6 text-lg">
            ✅ Cadastro Gratuito já liberado
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6 max-w-md">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300"
              required
            />
            <input
              type="tel"
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300"
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
