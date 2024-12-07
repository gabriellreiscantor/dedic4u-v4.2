import React from 'react';
import { useEffect } from 'react';
import { processWebhook } from '../services/webhook';

export function WebhookPage() {
  useEffect(() => {
    const handleWebhook = async (event: any) => {
      try {
        await processWebhook(event.data);
      } catch (error) {
        console.error('Erro ao processar webhook:', error);
      }
    };

    window.addEventListener('mercadopago', handleWebhook);
    return () => window.removeEventListener('mercadopago', handleWebhook);
  }, []);

  return null;
}