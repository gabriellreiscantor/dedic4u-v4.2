import { Plan, FormData, CheckoutData } from '../types';

export interface RouteState {
  formData: FormData;
  selectedPlan: Plan;
  checkoutData?: CheckoutData;
  total?: number;
  slug?: string;
}

export const generatePageUrl = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};