import { useState } from 'react';
import { products } from '../data/products';

export const useProducts = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const calculateTotal = (basePrice: number) => {
    const productsTotal = selectedProducts.reduce((total, productId) => {
      const product = products.find(p => p.id === productId);
      return total + (product?.price || 0);
    }, 0);
    const shippingCost = selectedProducts.length > 0 ? 14.90 : 0;
    return basePrice + productsTotal + shippingCost;
  };

  return {
    selectedProducts,
    handleProductSelect,
    calculateTotal,
  };
};