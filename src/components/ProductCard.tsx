import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isSelected, onSelect }) => {
  return (
    <motion.div
      className={`relative bg-white/5 rounded-lg p-4 cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-pink-500' : ''
      }`}
      onClick={() => onSelect(product.id)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="aspect-square mb-3 overflow-hidden rounded-lg">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>
      <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
      <p className="text-xs text-gray-400 mb-2 line-clamp-2">{product.description}</p>
      <p className="text-pink-500 font-bold text-sm">R$ {product.price.toFixed(2)}</p>
    </motion.div>
  );
};