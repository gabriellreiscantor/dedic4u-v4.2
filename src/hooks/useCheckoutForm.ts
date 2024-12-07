import { useState } from 'react';
import { CheckoutData } from '../types';

const initialCheckoutData: CheckoutData = {
  name: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
  selectedProducts: []
};

export const useCheckoutForm = () => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>(initialCheckoutData);

  const updateField = (field: keyof CheckoutData, value: string) => {
    setCheckoutData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const requiredFields: (keyof CheckoutData)[] = ['name', 'email', 'address', 'city', 'state', 'zipCode'];
    return requiredFields.every(field => checkoutData[field]);
  };

  return {
    checkoutData,
    updateField,
    validateForm,
  };
};