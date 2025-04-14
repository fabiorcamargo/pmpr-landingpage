import React from 'react';

interface PaymentDetailsProps {
  formData: {
    tel: string;
    email: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    name: string;
    address: string;
    city: string;
    zipCode: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ formData, handleInputChange }) => {
  const inputClassName = "mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500";
  const labelClassName = "block text-sm font-medium text-gray-200";

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Dados de Pagamento</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className={labelClassName}>
            Número do Cartão
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className={labelClassName}>
              Validade
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label htmlFor="cvv" className={labelClassName}>
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="name" className={labelClassName}>
            Nome Impresso no Cartão
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
          <label htmlFor="zipCode" className={labelClassName}>
            CEP
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>

        <div>
          <label htmlFor="address" className={labelClassName}>
            Endereço
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className={labelClassName}>
              Cidade
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
          </div>


        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;