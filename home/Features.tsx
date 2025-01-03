
import React from 'react';

const features = [
  {
    title: 'Personalização Fácil',
    description: 'Crie uma página única e personalizada em apenas alguns minutos.',
  },
  {
    title: 'Pagamento Seguro',
    description: 'Oferecemos diversas opções de pagamento, incluindo PIX e Cartão de Crédito.',
  },
  {
    title: 'Link e QR Code',
    description: 'Compartilhe a página com um link ou QR code facilmente.',
  },
  {
    title: 'Suporte Rápido',
    description: 'Nosso time está disponível para te ajudar durante todo o processo.',
  },
];

export const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Benefícios de Criar Sua Página
        </h2>
        <p className="text-center text-gray-700 mb-12">
          Descubra os benefícios de criar uma página personalizada para alguém especial.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
