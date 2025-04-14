import React from 'react';

interface PaymentDetailsProps {
  formData: {
    tel: string;
    email: string;
    name: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ formData, handleInputChange }) => {
  const inputClassName = "mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500";
  const labelClassName = "block text-sm font-medium text-gray-200";

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Dados Pessoais</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClassName}>
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>
        <div>
          <label htmlFor="tel" className={labelClassName}>
            Telefone
          </label>
          <input
            type="tel"
            id="tel"
            name="tel"
            value={formData.tel}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClassName}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;