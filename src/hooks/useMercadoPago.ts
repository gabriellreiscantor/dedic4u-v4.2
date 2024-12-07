import { useState, useEffect } from 'react';
import { createMercadoPagoPayment, checkMercadoPagoPayment } from '../services/mercadoPago';

export const useMercadoPago = () => {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'approved' | 'error'>('pending');

  const createPayment = async (
    amount: number,
    description: string,
    payer: { email: string; name: string }
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createMercadoPagoPayment(amount, description, payer);
      setPaymentData(response);
      return response;
    } catch (err) {
      setError('Erro ao criar pagamento. Por favor, tente novamente.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (paymentId: string) => {
    try {
      setLoading(true);
      const isApproved = await checkMercadoPagoPayment(paymentId);
      setPaymentStatus(isApproved ? 'approved' : 'pending');
      return isApproved;
    } catch (err) {
      setPaymentStatus('error');
      setError('Erro ao verificar pagamento. Por favor, tente novamente.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    paymentData,
    loading,
    error,
    paymentStatus,
    createPayment,
    verifyPayment,
  };
};