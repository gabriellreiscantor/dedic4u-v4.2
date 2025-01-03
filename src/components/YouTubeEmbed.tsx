// src/components/YouTubeEmbed.tsx
import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
  const getEmbedUrl = (url: string): string => {
    try {
      // Para shorts
      if (url.includes('/shorts/')) {
        const shortId = url.split('/shorts/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${shortId}?autoplay=1&mute=1&loop=1&playlist=${shortId}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3`;
      }
      
      // Para vídeos normais
      const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/videos\/|.*\/embed\/|.*\/watch\?v=))([^"&?\/\s]{11})/);
      const extractedId = videoIdMatch ? videoIdMatch[1] : '';
      return `https://www.youtube.com/embed/${extractedId}?autoplay=1&mute=1&loop=1&playlist=${extractedId}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3`;
    } catch (error) {
      console.error('Erro ao processar URL do vídeo:', error);
      return '';
    }
  };

  const embedUrl = getEmbedUrl(videoId);

  if (!embedUrl) {
    return null;
  }

  return (
    <div 
      className="relative w-full overflow-hidden rounded-lg" 
      style={{ paddingBottom: '140%' }}
    >
      <iframe
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ 
          border: 'none',
          backgroundColor: 'black'
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
