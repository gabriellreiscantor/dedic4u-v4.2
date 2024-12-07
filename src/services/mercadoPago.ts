import axios from 'axios';
import { MP_CONFIG } from '../config/mercadoPago';

interface PreferenceItem {
  title: string;
  unit_price: number;
  quantity: number;
}

interface PreferencePayer {
  email: string;
  name: string;
}

interface CreatePreferenceParams {
  items: PreferenceItem[];
  payer: PreferencePayer;
}

export const createPreference = async ({ items, payer }: CreatePreferenceParams) => {
  try {
    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      {
        items: items.map(item => ({
          ...item,
          currency_id: 'BRL'
        })),
        payer,
        back_urls: {
          success: `${MP_CONFIG.SITE_URL}/success`,
          failure: `${MP_CONFIG.SITE_URL}/failure`,
          pending: `${MP_CONFIG.SITE_URL}/pending`
        },
        auto_return: 'approved',
        notification_url: MP_CONFIG.WEBHOOK_URL,
        statement_descriptor: 'DEDIC4U',
        payment_methods: {
          installments: 12,
          excluded_payment_types: []
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${MP_CONFIG.ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar preferência:', error.response?.data || error);
    throw new Error('Falha ao criar checkout do Mercado Pago');
  }
};

export const checkPaymentStatus = async (paymentId: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          'Authorization': `Bearer ${MP_CONFIG.ACCESS_TOKEN}`
        }
      }
    );

    return response.data.status === 'approved';
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    throw error;
  }
};