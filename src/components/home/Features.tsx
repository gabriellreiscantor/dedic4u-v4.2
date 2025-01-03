import React from 'react';
import { Clock, Music, Globe } from 'lucide-react';
import { RelationshipTimer } from '../RelationshipTimer';
import { YouTubeEmbed } from '../YouTubeEmbed';

export const Features = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Recursos Disponíveis
        </h2>
        <p className="text-center text-gray-300 mb-12">
          Confira todos os recursos que você pode adicionar à sua página personalizada
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-black/30 p-6 rounded-lg">
            <Clock className="w-8 h-8 text-pink-500 mb-4" />
            <h3 className="font-bold mb-2">Contador de Tempo Juntos</h3>
            <p className="text-gray-300 mb-4">
              Veja quanto tempo você e seu amor estão compartilhando momentos especiais.
            </p>
            <div className="bg-black/20 p-4 rounded-lg">
              <RelationshipTimer startDate="2024-01-01" />
            </div>
          </div>

          <div className="bg-black/30 p-6 rounded-lg">
            <Music className="w-8 h-8 text-pink-500 mb-4" />
            <h3 className="font-bold mb-2">Música do Casal</h3>
            <p className="text-gray-300 mb-4">
              Adicione aquela música que marca a história de vocês.
            </p>
            <div className="rounded-lg overflow-hidden">
              <YouTubeEmbed videoId="https://www.youtube.com/shorts/zIVI4h96iV8" />
            </div>
          </div>

          <div className="bg-black/30 p-6 rounded-lg">
            <Globe className="w-8 h-8 text-pink-500 mb-4" />
            <h3 className="font-bold mb-2">Compartilhe o Amor</h3>
            <p className="text-gray-300 mb-4">
              Compartilhe sua página especial com quem você ama.
            </p>
            <div className="rounded-lg overflow-hidden">
              <YouTubeEmbed videoId="https://www.youtube.com/shorts/T5adt6SkAdA" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
