'use client';

import { useState } from 'react';
import ApplePayButton from './ApplePayButton';

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export default function CheckoutPage() {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Pedido enviado!');
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 sm:rounded sm:rounded-lg pt-8 sm:pt-0">
            <div className="max-w-3xl mx-auto p-6 sm:mt-10">
                <div className="mb-6 border border-gray-300 dark:border-gray-700 p-4 rounded bg-gray-100 dark:bg-gray-800 t">
                    <h2 className="text-xl font-semibold mb-2">Resumo do Pedido</h2>
                    <p className="text-lg font-medium">📦 Curso de Programação Web</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Aprenda a desenvolver sites e sistemas com HTML, CSS, JavaScript e muito mais.
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">Total: R$ 297,00</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dados Pessoais */}
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
                                placeholder="Telefone"
                                className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded transition"
                    >
                        Finalizar Pedido
                    </button>
                </form>

                <ApplePayButton />

            </div>
        </div>
    );
}
