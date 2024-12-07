import React from 'react';
import { motion } from 'framer-motion';
import { Plan } from '../types';
import { Link } from 'react-scroll';

interface PlanCardProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/5 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md mx-auto border border-pink-500/20"
    >
      <h3 className="romantic-title text-3xl text-center mb-4">{plan.name}</h3>
      <div className="text-center mb-6">
        <div className="text-gray-400">
          De <span className="line-through">R$ {plan.originalPrice.toFixed(2)}</span>
        </div>
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-3xl font-bold text-pink-500 mt-1"
        >
          por R$ {plan.discountedPrice.toFixed(2)}
        </motion.div>
      </div>
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-white justify-center">
            {feature}
          </li>
        ))}
      </ul>
      <Link 
        to="form" 
        smooth={true} 
        duration={800} 
        offset={-50}
      >
        <button
          onClick={() => onSelect(plan)}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Escolher Plano
        </button>
      </Link>
    </motion.div>
  );
};