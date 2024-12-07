export interface Plan {
  id: 'basic' | 'premium';
  name: string;
  originalPrice: number;
  discountedPrice: number;
  paymentLink: string;
  features: string[];
  maxImages: number;
  maxCharacters: number;
  duration: string;
  allowsMusic: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  paymentLink: string;
}

export interface FormData {
  title: string;
  message: string;
  images: (File | string)[];
  relationshipDate: string;
  youtubeLink?: string;
}

export interface CheckoutData {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  selectedProducts: string[];
}

export interface PageData {
  title: string;
  message: string;
  relationshipDate: string;
  youtubeLink?: string;
  images: string[];
  planId: string;
  planName: string;
}