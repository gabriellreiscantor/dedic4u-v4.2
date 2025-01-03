import React from 'react';
import { FileText, CreditCard, QrCode, Heart } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Formulário de criação',
    description: 'Siga as etapas preenchendo o formulário.'
  },
  {
    icon: CreditCard,
    title: 'Pagamento seguro',
    description: 'Faça o pagamento de forma segura com Cartão de Crédito ou PIX.'
  },
  {
    icon: QrCode,
    title: 'Código QR e link',
    description: 'Você receberá um QR code e um link via email para acessar a página personalizada.'
  },
  {
    icon: Heart,
    title: 'Faça a surpresa',
    description: 'Faça uma surpresa para alguém especial compartilhando o link ou o QR code.'
  }
];

export const Steps = () => {
  return (
    <section className="py-16 bg-black/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Crie a página em 4 etapas
        </h2>
        <p className="text-center text-gray-300 mb-12">
          Surpreenda alguém especial com uma página personalizada. É fácil e rápido.
        </p>
        
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-pink-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
