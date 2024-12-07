import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader, Heart } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import { savePage } from '../services/database/pages';

export function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, selectedPlan, slug } = location.state || {};

  useEffect(() => {
    const savePageData = async () => {
      if (!formData || !selectedPlan || !slug) {
        navigate('/', { replace: true });
        return;
      }

      try {
        const saved = await savePage(formData, selectedPlan, slug);
        if (!saved) {
          throw new Error('Erro ao salvar página');
        }
      } catch (error) {
        console.error('Erro ao salvar página:', error);
        navigate('/', { replace: true });
      }
    };

    savePageData();
  }, [formData, selectedPlan, slug, navigate]);

  const seconds = useCountdown(30, () => {
    if (slug) {
      navigate(`/${slug}`);
    }
  });

  if (!formData || !selectedPlan || !slug) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-xl text-red-500">Informações inválidas</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <Loader className="w-12 h-12 animate-spin text-pink-500 mx-auto mb-6" />
        <h1 className="text-3xl font-dancing mb-4">Processando seu Pagamento</h1>
        <p className="text-xl text-gray-300 mb-8">
          Aguarde {seconds} segundos para ter sua página personalizada
        </p>
        <div className="flex justify-center">
          <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
}