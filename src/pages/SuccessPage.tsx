import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Loader } from 'lucide-react';
import { checkPaymentStatus } from '../services/mercadoPago';

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const paymentId = searchParams.get('payment_id');
        const pendingPageData = localStorage.getItem('pendingPage');

        if (!paymentId || !pendingPageData) {
          setError('Informações de pagamento não encontradas');
          setLoading(false);
          return;
        }

        const isApproved = await checkPaymentStatus(paymentId);
        if (isApproved) {
          const { slug } = JSON.parse(pendingPageData);
          localStorage.removeItem('pendingPage');
          navigate(`/${slug}`);
        } else {
          setError('Pagamento não aprovado');
        }
      } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
        setError('Erro ao verificar pagamento');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-pink-500 mx-auto mb-4" />
          <p>Verificando pagamento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Check className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-4">Pagamento Aprovado!</h1>
        <p className="text-gray-300 mb-6">Redirecionando para sua página...</p>
      </div>
    </div>
  );
}