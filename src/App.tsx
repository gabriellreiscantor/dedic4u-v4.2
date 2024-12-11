import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PersonalizedPage } from './pages/PersonalizedPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentPage } from './pages/PaymentPage';
import { SuccessPage } from './pages/SuccessPage';
import FormPage from './pages/FormPage'; // Página do Formulário
import ThankYouPage from './pages/ThankYouPage'; // Página de Agradecimento

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/form" element={<FormPage />} /> {/* Rota do Formulário */}
        <Route path="/thank-you" element={<ThankYouPage />} /> {/* Rota de Agradecimento */}
        <Route path="/:slug" element={<PersonalizedPage />} />
      </Routes>
    </div>
  );
}

export default App;
