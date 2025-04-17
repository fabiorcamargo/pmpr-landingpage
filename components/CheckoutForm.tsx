'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import MpButton from '@components/MpButton';
// import AnalyticsDebugger from './AnalyticsDebugger';

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export default function CheckoutPage() {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        telefone: ''
    });

    const [formOculto, setFormOculto] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [clientId, setClientId] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false); // Novo estado para o carregamento

    const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID as string;
    const pmprPrice = process.env.NEXT_PUBLIC_PMPR_PRICE as string;

    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('get', GA_TRACKING_ID, 'client_id', (id: string) => {
                setClientId(id);
            });
        }
    }, []);

    const isEmailValido = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleInputChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleContinuar = async (e: React.FormEvent) => {
        e.preventDefault();

        const { nome, email, telefone } = form;

        if (!nome.trim() || !email.trim() || !telefone) {
            alert('Por favor, preencha todos os campos antes de continuar.');
            return;
        }

        if (!isEmailValido(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        if (!isValidPhoneNumber(telefone)) {
            alert('Por favor, insira um número de telefone válido.');
            return;
        }

        setIsProcessing(true); // Ativa o estado de carregamento

        const res = await fetch('/api/mp_payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome,
                email,
                telefone,
                client_id: clientId,
                produto: {
                    id: 'pmpr-aline-1',
                    title: 'Preparatório PMPR 2025',
                    description: 'Curso completo com 80 aulas, contempla todas as disciplinas do Edital, exercícios no formato de Banca, Simulados, etc...',
                    price: pmprPrice,
                    quantity: 1
                }
            })
        });

        const data = await res.json();
        setPreferenceId(data.id);
        setShowPayment(true);
        setFormOculto(true);
        setIsProcessing(false); // Desativa o estado de carregamento
    };

    return (
        <div className="mx-auto">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4">
                <div className="bg-white mx-auto sm:mt-8 max-w-2xl rounded-3xl ring-1 ring-slate-300 mt-0 lg:mx-0 lg:flex lg:max-w-none mb-20 min-w-[300px] sm:min-w-[558px]">
                    {/* <div className="p-8 sm:p-10 lg:flex-auto">
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900">Preparatório PMPR 2025</h3>
                        <p className="mt-2 text-base leading-7 text-gray-600">Preparatório completo com todo o conteúdo do edital do concurso para Soldado, tenha o melhor desempenho no concurso.</p>
                        <div className="mt-8 flex items-center gap-x-4">
                            <h4 className="flex-none text-md font-semibold leading-6 text-sky-800">O que está incluso:</h4>
                            <div className="h-px flex-auto bg-gray-100"></div>
                        </div>
                        <ul role="list" className="mt-4 grid grid-cols-1 gap-2 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                            <li className="flex gap-x-3">
                                <svg className="h-6 w-5 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
                                </svg>
                                80 Aulas completas
                            </li>
                            <li className="flex gap-x-3">
                                <svg className="h-6 w-5 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
                                </svg>
                                As aula possuem exercícios no modelo de banca, para você ir se acostumando
                            </li>
                            <li className="flex gap-x-3">
                                <svg className="h-6 w-5 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
                                </svg>
                                Correções comentadas, os professores especialistas em concursos dão dicas preciosas durante as correções.
                            </li>
                            <li className="flex gap-x-3">
                                <svg className="h-6 w-5 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
                                </svg>
                                Simulado com questões de concursos anteriores, para você estar bem preparado.
                            </li>
                            <li className="flex gap-x-3">
                                <svg className="h-6 w-5 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
                                </svg>
                                Plataforma de estudos prática e moderna, com suporte Premium para você.
                            </li>
                        </ul>
                    </div> */}
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">

                        <div className="rounded-2xl bg-slate-100 py-4 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-4 min-w-[300px] sm:min-w-[540px]">

                            
                                <img className='mx-auto pb-4 rounded-2xl' src='assets/pmpr-1.webp' alt="Profissionaliza EAD" width={200} height={200} />
                          

                            <div className="mx-auto w-full px-1 sm:px-8">

                                {/* <h3 className="text-2xl font-bold tracking-tight text-gray-900">Preparatório PMPR 2025</h3>

                                <p className="text-base font-semibold text-gray-600 pt-4">Preço promocional do 1º Lote<br></br>70% de desconto</p> */}
                                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                    <span className="text-md font-semibold leading-6 tracking-wide text-red-500 line-through">R$697,90</span>
                                </p>
                                <p className="flex items-baseline justify-center gap-x-2">
                                    <span className="text-5xl font-bold tracking-tight text-green-700">R$ {pmprPrice.replace('.', ",")}</span>
                                </p>
                                

                                <div className="pt-8 pb-2">
                                    {!formOculto && (
                                        <form onSubmit={handleContinuar}>

                                            <h2 className="text-xl font-semibold">Dados de Acesso</h2>
                                            <p className="mb-4">Insira os dados abaixo para liberar seu desconto.</p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Nome completo"
                                                    value={form.nome}
                                                    onChange={(e) => handleInputChange('nome', e.target.value)}
                                                    className="sm:col-span-2 border border-gray-300 p-2 rounded w-full bg-white text-gray-900"
                                                    required
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="E-mail"
                                                    value={form.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    className="sm:col-span-2 border border-gray-300 p-2 rounded w-full bg-white text-gray-900"
                                                    required
                                                />
                                                <PhoneInput
                                                    defaultCountry="BR"
                                                    value={form.telefone}
                                                    onChange={(value) => {
                                                        const maxLength = 15; // ajuste conforme necessário
                                                        const limitedValue = (value || '').slice(0, maxLength);
                                                        handleInputChange('telefone', limitedValue);
                                                    }}
                                                    international={false}
                                                    countryCallingCodeEditable={false}
                                                    placeholder="Telefone"
                                                    className="sm:col-span-2 border border-gray-300 p-2 rounded w-full bg-white text-gray-900"
                                                    required
                                                />
                                            </div>

                                            {/* Botão de continuar */}
                                            <button
                                                type="submit"
                                                className="mt-4 block w-full rounded-md bg-sky-600 px-3 py-3 text-center text-md font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                disabled={isProcessing} // Desabilita o botão durante o processamento
                                            >
                                                {isProcessing ? "Processando..." : "Liberar Desconto"}
                                            </button>
                                        </form>
                                    )}

                                    <AnimatePresence>
                                        {showPayment && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{ duration: 0.4 }}
                                                className="space-y-4"
                                            >
                                                <MpButton preferenceId={preferenceId} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className='text-center justify-center'>
                                    <p className="mt-2 text-xs leading-5 text-gray-800">Liberação imediata após processamento.</p>
                                </div>
                                {/* <AnalyticsDebugger/> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
