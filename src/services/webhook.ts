import express from 'express';
import cors from 'cors';
import { APP_CONFIG } from '../config/constants';
import { supabase } from '../config/supabase';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// Webhook do Mercado Pago
app.post('/webhooks/mercadopago', async (req, res) => {
  try {
    const { data } = req.body;
    
    // Verifica o pagamento no Mercado Pago
    const paymentResponse = await axios.get(
      `https://api.mercadopago.com/v1/payments/${data.id}`,
      {
        headers: {
          'Authorization': `Bearer ${APP_CONFIG.MERCADO_PAGO.ACCESS_TOKEN}`
        }
      }
    );

    const payment = paymentResponse.data;

    if (payment.status === 'approved') {
      // Ativa a página no Supabase
      const { error } = await supabase
        .from('pages')
        .update({ 
          is_active: true,
          activated_at: new Date(),
          expiration_date: payment.metadata.plan_duration === '1 ano' 
            ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            : null
        })
        .eq('payment_id', payment.id);

      if (error) throw error;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).json({ error: 'Erro ao processar webhook' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor webhook rodando na porta ${port}`);
});