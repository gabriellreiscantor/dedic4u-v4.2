import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PersonalizedPage } from './pages/PersonalizedPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentPage } from './pages/PaymentPage';
import { SuccessPage } from './pages/SuccessPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/:slug" element={<PersonalizedPage />} />
      </Routes>
    </div>
  );
}

export default App;