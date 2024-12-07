import axios from 'axios';

const MERCADO_PAGO_API = 'https://api.mercadopago.com/v1';
const ACCESS_TOKEN = 'APP_USR-1333822025101903-120309-a820538da18e4d21481788f6cb49a48d-533782004';
const PUBLIC_KEY = 'APP_USR-14160e5c-1ae3-465b-9bbf-6df2e53f2fae';

export const createPayment = async (amount: number, description: string, payer: { email: string }) => {
  try {
    const response = await axios.post(
      `${MERCADO_PAGO_API}/payments`,
      {
        transaction_amount: amount,
        description: description,
        payment_method_id: 'pix',
        payer: {
          email: payer.email,
          first_name: payer.name,
        },
        notification_url: 'https://seu-webhook-url.com/notifications', // Você precisará configurar isso
      },
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          'X-Idempotency-Key': new Date().getTime().toString(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    throw error;
  }
};

export const checkPaymentStatus = async (paymentId: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${MERCADO_PAGO_API}/payments/${paymentId}`,
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    return response.data.status === 'approved';
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error);
    throw error;
  }
};

export const getPublicKey = () => PUBLIC_KEY;