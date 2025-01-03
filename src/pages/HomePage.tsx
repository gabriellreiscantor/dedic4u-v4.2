// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { PlanCard } from '../components/PlanCard';
import { Steps } from '../components/home/Steps';
import { Features } from '../components/home/Features';
import { Testimonials } from '../components/home/Testimonials';
import { FAQ } from '../components/home/FAQ';
import { plans } from '../data/plans'; // Importando os planos

export function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState(null); // Estado para o plano selecionado

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Mapeando e renderizando os PlanCards */}
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={setSelectedPlan} />
          ))}
        </div>

        <Steps />
        <Features />
        <Testimonials />
        <FAQ />
      </main>
    </div>
  );
}
