import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ImageCarousel } from '../components/ImageCarousel';
import { RelationshipTimer } from '../components/RelationshipTimer';
import { MusicPlayer } from '../components/MusicPlayer';
import { Battery, Signal, Wifi, Heart, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { getPageBySlug } from '../services/database/pages';
import { PageData } from '../types';

export function PersonalizedPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showQRCode, setShowQRCode] = useState(false);
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const pageUrl = `${window.location.origin}/${slug}`;

  useEffect(() => {
    const loadPage = async () => {
      try {
        if (!slug) throw new Error('Slug não encontrado');
        const data = await getPageBySlug(slug);
        if (!data) throw new Error('Página não encontrada');
        setPageData(data);
      } catch (err) {
        console.error('Erro ao carregar página:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-pink-500 mx-auto mb-4" />
          <p>Carregando sua página de amor...</p>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">Página não encontrada</p>
          <button
            onClick={() => navigate('/')}
            className="text-pink-500 hover:text-pink-400 underline"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-black px-6 py-2 flex justify-between items-center rounded-t-xl">
          <Signal className="w-4 h-4 text-white" />
          <Wifi className="w-4 h-4 text-white" />
          <Battery className="w-4 h-4 text-white" />
        </div>

        <div className="bg-white px-4 py-2">
          <span className="text-black text-sm font-medium truncate block text-center">
            {pageUrl}
          </span>
        </div>

        <div className="bg-gradient-to-b from-pink-500/20 to-black/50 p-6 rounded-b-xl">
          {pageData.title && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="romantic-title text-3xl text-center mt-8 mb-8"
            >
              "{pageData.title}"
            </motion.h1>
          )}
          
          {pageData.images.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <ImageCarousel images={pageData.images} />
            </motion.div>
          )}

          {pageData.relationshipDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4"
            >
              <RelationshipTimer startDate={pageData.relationshipDate} />
            </motion.div>
          )}

          <div className="h-[0.5px] bg-pink-500/20 my-4" />

          {pageData.message && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white mb-4 leading-relaxed italic text-center whitespace-pre-line px-2"
              style={{ wordBreak: 'break-word' }}
            >
              {pageData.message}
            </motion.p>
          )}

          <div className="h-[0.5px] bg-pink-500/20 my-4" />

          {pageData.youtubeLink && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4"
              >
                <MusicPlayer youtubeUrl={pageData.youtubeLink} />
              </motion.div>
              <div className="flex justify-center mt-4">
                <Heart className="w-4 h-4 text-pink-500" />
              </div>
            </>
          )}

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowQRCode(!showQRCode)}
            className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg transition-colors w-full"
          >
            {showQRCode ? 'Ocultar QR Code' : 'Criar QR Code'}
          </motion.button>

          {showQRCode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 bg-white p-6 rounded-lg flex flex-col items-center"
            >
              <QRCodeSVG value={pageUrl} size={200} />
              <p className="mt-4 text-black text-sm text-center">
                Escaneie para compartilhar sua página de amor
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}