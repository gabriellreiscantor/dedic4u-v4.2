import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { initializeDatabase } from './config/supabase';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Inicializa o banco de dados antes de renderizar o app
initializeDatabase().catch(console.error);

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);