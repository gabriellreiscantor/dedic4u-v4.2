import React from 'react';
import { Loader } from 'lucide-react';

interface PaymentStatusProps {
  status: 'verifying' | 'success' | 'error';
  onRetry?: () => void;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ status, onRetry }) => {
  return (
    <div className="text-center p-4">
      {status === 'verifying' && (
        <div className="flex items-center justify-center gap-2">
          <Loader className="w-5 h-5 animate-spin text-pink-500" />
          <span>Verificando pagamento...</span>
        </div>
      )}
      
      {status === 'error' && (
        <div>
          <p className="text-red-500 mb-2">Erro ao verificar o pagamento</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-pink-500 hover:text-pink-400 underline"
            >
              Tentar novamente
            </button>
          )}
        </div>
      )}
      
      {status === 'success' && (
        <div className="text-green-500">
          Pagamento confirmado!
        </div>
      )}
    </div>
  );
};