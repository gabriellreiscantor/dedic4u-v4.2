import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 mb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-4">
          <motion.p
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-pink-500 text-sm font-semibold"
          >
            ❤️ Declare seu amor de uma forma única e especial! ❤️
          </motion.p>
        </div>
        
        <div className="flex items-center justify-center">
          <Heart className="text-pink-500 w-8 h-8 mr-2" />
          <h1 className="text-3xl font-bold">
            dedic
            <span className="text-pink-500">4u</span>
          </h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Declare Seu Amor
            <span className="text-pink-500">.</span>
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            Crie uma página única e especial para expressar seus sentimentos
          </p>
          <p className="text-md text-pink-500">
            Compartilhe facilmente por QR Code com quem você ama ❤️
          </p>
        </motion.div>
      </motion.div>
    </header>
  );
};