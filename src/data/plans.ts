import { Plan } from '../types';

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Amor Intenso',
    originalPrice: 39.90,
    discountedPrice: 19.99,
    paymentLink: 'https://mpago.la/2cRzGHH',
    features: [
      '🖼️ Até 3 imagens',
      '✍️ Texto até 500 caracteres',
      '⏱️ Contador de relacionamento',
      '📅 Página visível por 1 ano',
      '❌ Sem música'
    ],
    maxImages: 3,
    maxCharacters: 500,
    duration: '1 ano',
    allowsMusic: false
  },
  {
    id: 'premium',
    name: 'Amor Eterno',
    originalPrice: 79.90,
    discountedPrice: 39.99,
    paymentLink: 'https://mpago.la/2u3U7ow',
    features: [
      '🖼️ Até 8 imagens',
      '✍️ Texto até 800 caracteres',
      '⏱️ Contador de relacionamento',
      '🎵 Música do YouTube',
      '♾️ Página visível para sempre'
    ],
    maxImages: 8,
    maxCharacters: 800,
    duration: 'sempre',
    allowsMusic: true
  }
];