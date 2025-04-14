'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApplePayButton from './ApplePayButton';

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const formatTelefone = (value: string) => {
    let cleaned = value.replace(/\D/g, "");

    if (cleaned.startsWith("55") && cleaned.length > 11) {
        cleaned = cleaned.substring(2); // Remove o código do Brasil (55)
    }

    if (cleaned.length <= 2) return `(${cleaned}`;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    if (cleaned.length <= 10)
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

export default function CheckoutPage() {
    const [showPayment, setShowPayment] = useState(false);
    const [telefone, setTelefone] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Pedido enviado!');
    };

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setTelefone(formatTelefone(value));
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 sm:rounded sm:rounded-lg pt-8 sm:pt-0">
            <div className="max-w-3xl mx-auto p-6 sm:mt-10">
                {/* Resumo do Pedido */}
                <div className="mb-6 border border-gray-300 dark:border-gray-700 p-4 rounded bg-gray-100 dark:bg-gray-800">
                    <h2 className="text-xl font-semibold mb-2">Resumo do Pedido</h2>
                    <p className="text-lg font-medium">📦 Curso de Programação Web</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Aprenda a desenvolver sites e sistemas com HTML, CSS, JavaScript e muito mais.
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">Total: R$ 297,00</p>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Nome completo"
                                className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                            <input
                                type="tel"
                                value={telefone}
                                onChange={handleTelefoneChange}
                                placeholder="(DDD) 9XXXX-XXXX"
                                className="sm:col-span-2 border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    {!showPayment && (
                        <button
                            type="button"
                            onClick={() => setShowPayment(true)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition"
                        >
                            Continuar
                        </button>
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
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded transition"
                                >
                                    Finalizar Pedido
                                </button>
                                <ApplePayButton />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </div>
    );
}
