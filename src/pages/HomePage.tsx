import React, { useState } from 'react';
import { Header } from '../components/Header';
import { PlanCard } from '../components/PlanCard';
import { Steps } from '../components/home/Steps';
import { Features } from '../components/home/Features';
import { Testimonials } from '../components/home/Testimonials';
import { FAQ } from '../components/home/FAQ';

export function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Exemplo de como os PlanCards podem ser usados */}
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
