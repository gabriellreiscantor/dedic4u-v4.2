import React from 'react';
import { CheckoutData } from '../../types';

interface CheckoutFormProps {
  checkoutData: CheckoutData;
  onFieldUpdate: (field: keyof CheckoutData, value: string) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  checkoutData, 
  onFieldUpdate
}) => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-6">1. Dados do Cliente</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Nome completo</label>
            <input
              id="name"
              type="text"
              name="name"
              value={checkoutData.name}
              onChange={(e) => onFieldUpdate('name', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-pink-500/20 focus:border-pink-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">E-mail</label>
            <input
              id="email"
              type="email"
              name="email"
              value={checkoutData.email}
              onChange={(e) => onFieldUpdate('email', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-pink-500/20 focus:border-pink-500 focus:outline-none"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">2. Endereço de Cobrança</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-2">Endereço completo</label>
            <input
              id="address"
              type="text"
              name="address"
              value={checkoutData.address}
              onChange={(e) => onFieldUpdate('address', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-pink-500/20 focus:border-pink-500 focus:outline-none"
              placeholder="Rua, número, bairro"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-2">Cidade</label>
              <input
                id="city"
                type="text"
                name="city"
                value={checkoutData.city}
                onChange={(e) => onFieldUpdate('city', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-pink-500/20 focus:border-pink-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-2">Estado</label>
              <input
                id="state"
                type="text"
                name="state"
                value={checkoutData.state}
                onChange={(e) => onFieldUpdate('state', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-pink-500/20 focus:border-pink-500 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium mb-2">CEP</label>
              <input
                id="zipCode"
                type="text"
                name="zipCode"
                value={checkoutData.zipCode}
                onChange={(e) => onFieldUpdate('zipCode', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-pink-500/20 focus:border-pink-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Telefone (opcional)</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={checkoutData.phone}
                onChange={(e) => onFieldUpdate('phone', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-pink-500/20 focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};