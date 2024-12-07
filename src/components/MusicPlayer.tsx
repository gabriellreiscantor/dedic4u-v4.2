import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Music, Pause, Play } from 'lucide-react';

interface MusicPlayerProps {
  youtubeUrl: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ youtubeUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [player, setPlayer] = useState<any>(null);

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/videos\/|.*\/embed\/|.*\/watch\?v=))([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(youtubeUrl);

  useEffect(() => {
    if (player && videoId) {
      fetch(`https://noembed.com/embed?url=${youtubeUrl}`)
        .then(res => res.json())
        .then(data => {
          // Limita o título a 25 caracteres
          const shortTitle = data.title.length > 25 
            ? data.title.substring(0, 25) + '...' 
            : data.title;
          setVideoTitle(shortTitle);
        });
    }
  }, [player, youtubeUrl]);

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!videoId) return null;

  return (
    <div className="relative">
      <div className="hidden">
        <YouTube
          videoId={videoId}
          onReady={(event) => setPlayer(event.target)}
          opts={{ height: '0', width: '0' }}
        />
      </div>
      <div className="bg-pink-500/10 rounded-lg p-4 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center flex-1 min-w-0">
          <Music className="w-5 h-5 text-pink-500 mr-3 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {videoTitle || 'Carregando...'}
            </p>
            <p className="text-xs text-pink-500">Nossa música</p>
          </div>
        </div>
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-pink-500/20 hover:bg-pink-500/30 transition-colors ml-2 flex-shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};