
import React from 'react';

const testimonials = [
  {
    name: 'Maria Silva',
    feedback: 'Amei a experiência! Foi super simples e a surpresa foi incrível.',
  },
  {
    name: 'Carlos Souza',
    feedback: 'Uma forma única de demonstrar carinho. Recomendo muito!',
  },
  {
    name: 'Ana Costa',
    feedback: 'Surpreendi meu namorado de forma criativa. A página ficou linda!',
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          O Que Nossos Clientes Dizem
        </h2>
        <p className="text-center text-gray-700 mb-12">
          Veja como a nossa plataforma tem feito a diferença para muitos usuários.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">{testimonial.feedback}</p>
              <h4 className="font-bold text-lg">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
