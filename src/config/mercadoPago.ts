import { initMercadoPago } from '@mercadopago/sdk-react';

export const MP_CONFIG = {
  PUBLIC_KEY: 'APP_USR-14160e5c-1ae3-465b-9bbf-6df2e53f2fae',
  ACCESS_TOKEN: 'APP_USR-1333822025101903-120309-a820538da18e4d21481788f6cb49a48d-533782004',
  SITE_URL: 'https://dedic4u.shop',
  WEBHOOK_URL: 'https://dedic4u.shop/webhooks/mercadopago'
};

// Inicializa o SDK do Mercado Pago
initMercadoPago(MP_CONFIG.PUBLIC_KEY);