import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { PlanCard } from '../components/PlanCard';
import { Steps } from '../components/home/Steps'; // Novo componente
import { Features } from '../components/home/Features'; // Novo componente
import { Testimonials } from '../components/home/Testimonials'; // Novo componente
import { FAQ } from '../components/home/FAQ'; // Novo componente
import { CoupleForm } from '../components/CoupleForm';
import { PhoneMockup } from '../components/PhoneMockup';
import { plans } from '../data/plans';
import { FormData } from '../types';

export function HomePage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    message: '',
    images: [],
    relationshipDate: '',
    youtubeLink: ''
  });

  const handleFormChange = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    navigate('/checkout', { 
      state: { 
        formData, 
        selectedPlan,
        slug
      } 
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSelect={setSelectedPlan}
            />
          ))}
        </div>

        {selectedPlan && (
          <div id="form" className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Personalize sua página
                </h2>
                <CoupleForm
                  selectedPlan={selectedPlan}
                  formData={formData}
                  onChange={handleFormChange}
                  onSubmit={handleSubmit}
                />
              </div>
              <div className="sticky top-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Prévia da sua página
                </h2>
                <div className="flex justify-center">
                  <PhoneMockup formData={formData} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seções adicionais */}
        <div className="mt-16">
          <Steps /> {/* Passos do processo */}
        </div>
        <div className="mt-16">
          <Features /> {/* Destacar recursos e funcionalidades */}
        </div>
        <div className="mt-16">
          <Testimonials /> {/* Testemunhos de clientes */}
        </div>
        <div className="mt-16">
          <FAQ /> {/* Perguntas frequentes */}
        </div>
      </main>
    </div>
  );
}
