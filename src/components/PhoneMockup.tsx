import React from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../types';
import { ImageCarousel } from './ImageCarousel';
import { RelationshipTimer } from './RelationshipTimer';
import { MusicPlayer } from './MusicPlayer';
import { Battery, Signal, Wifi, Heart } from 'lucide-react';

interface PhoneMockupProps {
  formData: FormData;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ formData }) => {
  const pageUrl = formData.title
    ? `dedic4u.shop/${formData.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`
    : 'dedic4u.shop/sua-pagina';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-[300px] h-[600px] bg-black rounded-[3rem] p-4 shadow-xl mx-auto"
    >
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-b-2xl" />
      <div className="h-full w-full bg-gradient-to-b from-gray-900 to-black rounded-[2.5rem] overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="bg-black px-6 py-2 flex justify-between items-center">
            <Signal className="w-4 h-4 text-white" />
            <Wifi className="w-4 h-4 text-white" />
            <Battery className="w-4 h-4 text-white" />
          </div>

          <div className="bg-white px-4 py-2">
            <span className="text-black text-sm font-medium truncate block text-center">
              {pageUrl}
            </span>
          </div>

          <div className="p-6 bg-gradient-to-b from-pink-500/20 to-black/50">
            {formData.title && (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="romantic-title text-3xl text-center mt-8 mb-8"
              >
                "{formData.title}"
              </motion.h1>
            )}
            
            {formData.images.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6"
              >
                <ImageCarousel images={formData.images} />
              </motion.div>
            )}

            {formData.relationshipDate && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4"
              >
                <RelationshipTimer startDate={formData.relationshipDate} />
              </motion.div>
            )}

            <div className="h-[0.5px] bg-pink-500/20 my-4" />

            {formData.message && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white mb-4 leading-relaxed italic text-center whitespace-pre-line px-2"
                style={{ wordBreak: 'break-word' }}
              >
                {formData.message}
              </motion.p>
            )}

            <div className="h-[0.5px] bg-pink-500/20 my-4" />

            {formData.youtubeLink && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4"
                >
                  <MusicPlayer youtubeUrl={formData.youtubeLink} />
                </motion.div>
                <div className="flex justify-center mt-4">
                  <Heart className="w-4 h-4 text-pink-500" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};