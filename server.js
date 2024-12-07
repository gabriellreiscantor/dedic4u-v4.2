import express from 'express';
import cors from 'cors';
import { processWebhook } from './src/services/webhook.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/notificacoes', async (req, res) => {
  try {
    const { data } = req.body;
    await processWebhook(data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).json({ error: 'Erro ao processar webhook' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});