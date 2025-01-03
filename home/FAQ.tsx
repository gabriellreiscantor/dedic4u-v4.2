
import React from 'react';

const faqs = [
  {
    question: 'Como criar minha página personalizada?',
    answer: 'Basta preencher o formulário e escolher o plano desejado. Em seguida, faça o pagamento e pronto!',
  },
  {
    question: 'Quais opções de pagamento são aceitas?',
    answer: 'Aceitamos Cartão de Crédito, PIX e outras opções seguras.',
  },
  {
    question: 'Quanto tempo leva para criar minha página?',
    answer: 'O processo é rápido e pode ser feito em poucos minutos.',
  },
  {
    question: 'Posso alterar minha página depois de criada?',
    answer: 'Sim, você pode alterar a página a qualquer momento, mesmo após a criação.',
  },
];

export const FAQ = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Perguntas Frequentes</h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="font-bold text-lg">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
