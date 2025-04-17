import React from 'react';
import { OrderItem } from './CheckoutForm';

interface OrderSummaryProps {
  orderItems: OrderItem[];
  shippingCost: number;
  taxRate: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderItems, shippingCost, taxRate }) => {
  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Produtos</h2>
      
      <div className="space-y-4">
        {orderItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-2  rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">{item.name}</h3>
              {/* <p className="text-sm text-gray-300">Quantity: {item.quantity}</p> */}
            </div>
            <p className="text-sm font-medium text-white">
              R$ {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        {/* <div className="border-t border-gray-600 pt-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-300">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm text-gray-300">
            <p>Shipping</p>
            <p>${shippingCost.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm text-gray-300">
            <p>Tax ({(taxRate * 100).toFixed(0)}%)</p>
            <p>${tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-white pt-2 border-t border-gray-600">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
        </div>
      </div> */}
    </div>
    </div>
  );
};

export default OrderSummary;