import { useState, useEffect } from 'react';
import { createPayment, checkPaymentStatus } from '../utils/payment';

export const usePayment = (total: number, description: string, payer: { email: string; name: string }) => {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [checkInterval, setCheckInterval] = useState<NodeJS.Timeout | null>(null);

  const initializePayment = async () => {
    try {
      setLoading(true);
      const payment = await createPayment(total, description, payer);
      setPaymentData(payment);
      return payment;
    } catch (err) {
      setError('Erro ao iniciar pagamento. Tente novamente.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (paymentId: string) => {
    try {
      setChecking(true);
      return await checkPaymentStatus(paymentId);
    } catch (err) {
      setError('Erro ao verificar pagamento. Tente novamente.');
      throw err;
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [checkInterval]);

  return {
    paymentData,
    loading,
    error,
    checking,
    initializePayment,
    verifyPayment,
    setCheckInterval,
  };
};