'use client';

import { useState } from 'react';

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const detectCardBrand = (number: string) => {
    const cleaned = number.replace(/\D/g, '');
    if (/^4/.test(cleaned)) return 'Visa';
    if (/^5[1-5]/.test(cleaned)) return 'MasterCard';
    if (/^3[47]/.test(cleaned)) return 'American Express';
    return 'Desconhecida';
};

const CardPreview = ({
    number,
    name,
    expiry,
}: {
    number: string;
    name: string;
    expiry: string;
}) => {
    const brand = detectCardBrand(number);

    const maskedNumber = number
        .replace(/\D/g, '')
        .padEnd(16, '•')
        .replace(/(\d{4})(?=\d)/g, '$1 ');

    const brandLogo = {
        Visa: '💳 Visa',
        MasterCard: '💳 MasterCard',
        'American Express': '💳 Amex',
        Desconhecida: '💳 Cartão',
    }[brand];

    return (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-700 dark:to-purple-700 text-white rounded-xl p-6 shadow-md w-full max-w-xs mb-6">
            <div className="text-lg font-bold mb-2">{brandLogo}</div>
            <div className="text-xl tracking-widest mb-4">{maskedNumber}</div>
            <div className="flex justify-between text-sm uppercase">
                <div>
                    <div className="text-xs">Nome no Cartão</div>
                    <div>{name || 'Seu Nome'}</div>
                </div>
                <div>
                    <div className="text-xs">Validade</div>
                    <div>{expiry || 'MM/AA'}</div>
                </div>
            </div>
        </div>
    );
};

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [cep, setCep] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [address, setAddress] = useState({
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
    });

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setCep(value);

        if (value.length === 8) {
            try {
                const res = await fetch(`https://viacep.com.br/ws/${value}/json/`);
                const data = await res.json();
                if (!data.erro) {
                    setAddress({
                        rua: data.logradouro,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        estado: data.uf,
                    });
                } else {
                    alert('CEP não encontrado!');
                }
            } catch {
                alert('Erro ao buscar o CEP.');
            }
        }
    };

    

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

                    {/* Endereço */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>

                        <input
                            type="text"
                            placeholder="CEP"
                            value={cep}
                            onChange={handleCepChange}
                            maxLength={8}
                            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            required
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Rua"
                                value={address.rua}
                                onChange={(e) => setAddress({ ...address, rua: e.target.value })}
                                className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Número"
                                className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Bairro"
                                value={address.bairro}
                                onChange={(e) => setAddress({ ...address, bairro: e.target.value })}
                                className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Cidade"
                                value={address.cidade}
                                onChange={(e) => setAddress({ ...address, cidade: e.target.value })}
                                className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Estado"
                                value={address.estado}
                                onChange={(e) => setAddress({ ...address, estado: e.target.value })}
                                className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    {/* Pagamento */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Forma de Pagamento</h2>

                        <div className="flex space-x-4 mb-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="credit"
                                    checked={paymentMethod === 'credit'}
                                    onChange={() => setPaymentMethod('credit')}
                                />
                                <span>Cartão de Crédito</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="pix"
                                    checked={paymentMethod === 'pix'}
                                    onChange={() => setPaymentMethod('pix')}
                                />
                                <span>Pix</span>
                            </label>
                        </div>

                        {paymentMethod === 'credit' && (
                            <>
                                <CardPreview number={cardNumber} name={cardName} expiry={cardExpiry} />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Número do Cartão"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        maxLength={19}
                                        className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nome no Cartão"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                        className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Validade (MM/AA)"
                                        value={cardExpiry}
                                        onChange={(e) => setCardExpiry(e.target.value)}
                                        maxLength={5}
                                        className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        value={cardCVV}
                                        onChange={(e) => setCardCVV(e.target.value)}
                                        maxLength={4}
                                        className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {paymentMethod === 'pix' && (
                            <div className="p-4 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                <p className="text-sm">Use o QR Code ou chave Pix para pagamento após finalização.</p>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded transition"
                    >
                        Finalizar Pedido
                    </button>
                </form>
            </div>
        </div>
    );
}
