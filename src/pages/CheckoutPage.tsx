import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { ProductGrid } from '../components/checkout/ProductGrid';
import { CheckoutData } from '../types';

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, selectedPlan, slug } = location.state || {};

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    selectedProducts: []
  });

  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [productId]
    );
  };

  const handleFieldUpdate = (field: keyof CheckoutData, value: string) => {
    setCheckoutData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Determina qual link de pagamento usar
      let paymentLink;
      if (selectedProducts.length > 0) {
        const product = products.find(p => p.id === selectedProducts[0]);
        paymentLink = product?.paymentLink;
      } else {
        paymentLink = selectedPlan?.paymentLink;
      }

      if (paymentLink) {
        // Abre o link de pagamento em uma nova aba
        window.open(paymentLink, '_blank');
        
        // Navega para a página de processamento
        navigate('/payment', { 
          state: { 
            formData,
            selectedPlan,
            checkoutData: {
              ...checkoutData,
              selectedProducts
            },
            slug
          }
        });
      }
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      alert('Erro ao processar pedido. Por favor, tente novamente.');
    }
  };

  if (!selectedPlan || !formData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
        <p>Informações do pedido não encontradas</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <CheckoutForm
              checkoutData={checkoutData}
              onFieldUpdate={handleFieldUpdate}
            />

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-2">Ta sem ideia de presente? 🎁</h2>
              <p className="text-gray-400 mb-2">
                Aproveite nossas canecas personalizadas e surpreenda ainda mais! 💝
              </p>
              <p className="text-sm text-gray-400 italic mb-6">
                Para remover uma caneca selecionada, basta clicar nela novamente
              </p>
              
              <ProductGrid
                products={products}
                selectedProducts={selectedProducts}
                onProductSelect={handleProductSelect}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-8"
            >
              Finalizar Pedido
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}